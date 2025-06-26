import React, { useState, useRef,  useEffect, type ChangeEvent } from 'react'; 
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import type { Country } from '../../types';
import useClickOutside from '../../hooks/useClickOutside';


interface PhoneInputProps {
  companyContact: string;
  phoneNumber: string;
  countries: Country[];
  onCompanyContactChange: (value: string) => void;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
  setErrors: any;
  onCompanyContactBlur?: React.FocusEventHandler<HTMLInputElement>;
  onPhoneNumberBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  companyContact,
  phoneNumber,
  countries,
  onCompanyContactChange,
  onPhoneNumberChange,
  errors,
  onCompanyContactBlur,
  onPhoneNumberBlur,
  setErrors,
}) => {
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  useClickOutside([inputRef], () => setShowSuggestions(false));

  // Update filteredCountries when countries is fetched
  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const handleCountryCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim().toUpperCase();

    if (!value.startsWith("+")) {
      value = `+${value.replace(/[^\d]/g, "")}`;
    } else {
      value = `+${value.slice(1).replace(/[^\d]/g, "")}`;
    }

    value = value.slice(0, 5);
    onCompanyContactChange(value);
    setShowSuggestions(true);

    // Ensure type safety for errors
    if (errors.companyContact && countries.some((c) => c.code === value)) {
      setErrors((prevErrors: any) => {
        const newErrors = { ...prevErrors };
        delete newErrors.companyContact;
        return newErrors;
      });
    }

    // Ensure correct type matching
    const filtered = countries.filter(
      (country) => country.code.startsWith(value) || country.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  // Fix `prevErrors` type
  const handleSuggestionClick = (code: string) => {
    onCompanyContactChange(code);
    setShowSuggestions(false);
    if (errors.companyContact) {
      setErrors((prevErrors: any) => {
        const newErrors = { ...prevErrors };
        delete newErrors.companyContact;
        return newErrors;
      });
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); 
    onPhoneNumberChange({ ...e, target: { ...e.target, value } });

    if (errors.phoneNumber && /^\d{10}$/.test(value)) {
      setErrors((prevErrors: any) => {
        const newErrors = { ...prevErrors };
        delete newErrors.phoneNumber;
        return newErrors;
      });
    }
  };

  
  return (
    <div className="mb-4 mt-4" ref={inputRef}>
      <label className='block text-sm font-medium  mb-1'>Phone Number</label>
      <div className="flex items-center rounded-lg overflow-hidden">
        {/* Country Code Input */}
        <div className="relative w-1/3 sm:w-1/4 min-w-[60px]">
          <input
            type="text"
            value={companyContact}
            onBlur={onCompanyContactBlur}
         
            onChange={handleCountryCodeChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Code"
            className={`dark:opacity-55 px-3 py-2 text-base  font-normal w-full rounded-l-lg border-2 ${
              errors.companyContact ? "border-destructive" : "border-gray-300"
            } focus:border-accent focus:outline-none border-2 border-solid `}
          />
          {errors.companyContact && (
            <AiOutlineExclamationCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-destructive h-5 w-5" />
          )}
        </div>

        {/* Phone Number Input */}
        <div className="relative flex-grow">
  <input
    type="tel" 
    value={phoneNumber}
    pattern="\d*"
      onChange={handlePhoneNumberChange}
      onBlur={onPhoneNumberBlur}
      onKeyDown={(e) => {
        if (
          !(
            /\d/.test(e.key) ||
            ["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)
          )
        ) {
          e.preventDefault();
        }
      }}
  
    placeholder="Phone Number"
    maxLength={10}
    className={`dark:opacity-55 w-full px-3 py-2 text-base font-normal rounded-r-lg  border-2 ${
      errors.phoneNumber ? "border-destructive" : "border-gray-300"
    } focus:border-accent focus:outline-none border-2 border-solid `}
  />
  {errors.phoneNumber && (
    <AiOutlineExclamationCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-destructive h-5 w-5" />
  )}
</div>

      </div>

      {/* Error Messages */}
      {errors.companyContact && <p className="text-destructive text-xs mt-1">{errors.companyContact}</p>}
      {errors.phoneNumber && <p className="text-destructive text-xs mt-1">{errors.phoneNumber}</p>}

      {/* Country Suggestions */}
      {showSuggestions && filteredCountries.length > 0 && (
        <ul className='border  border-accent 
          rounded mt-1 max-h-40 overflow-y-auto'>
          {filteredCountries.map((country, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(country.code)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
            >
              {country.name} ({country.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PhoneInput;