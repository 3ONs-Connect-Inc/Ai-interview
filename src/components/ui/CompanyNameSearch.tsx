import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import Input from "./Input";

type Props = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors?: string;
   setErrors: React.Dispatch<React.SetStateAction<Partial<Record<string, string>>>>;
};

const CompanyNameSearch: React.FC<Props> = ({
  name,
  value,
  onChange,
  setFormData,
  errors,
    setErrors,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

 const fetchSuggestions = async (searchVal: string) => {
    if (searchVal.trim().length < 2) {
      setSuggestions([]);
      return [];
    }

    const q = query(collection(db, "users"), where("role", "==", "Company"));
    const snapshot = await getDocs(q);

    const names = snapshot.docs
      .map((doc) => doc.data().companyName)
      .filter(
        (name): name is string =>
          typeof name === "string" &&
          name.toLowerCase().includes(searchVal.toLowerCase())
      );

    const uniqueNames = Array.from(new Set(names));
    const topSuggestions = uniqueNames.slice(0, 5);
    setSuggestions(topSuggestions);
    return uniqueNames;
  };

  const handleBlur = async () => {
    const allCompanyNames = await fetchSuggestions(value);
    const isValid = allCompanyNames.some(
      (company) => company.toLowerCase() === value.trim().toLowerCase()
    );

    setTimeout(() => setShowDropdown(false), 200);

    if (!isValid && value.trim().length >= 2 && setErrors) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Company name not found. Please select a valid company.",
      }));
    } else {
      setErrors?.((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSelect = (name: string) => {
    setFormData((prev: any) => ({ ...prev, companyName: name }));
    setShowDropdown(false);
  };
  

  return (
    <div className="relative">
      <label className="block font-medium text-sm text-gray-700 mb-1">
        Company Name
      </label>
      <Input
        name={name}
        type="text"
        value={value}
        onChange={async (e) => {
          onChange(e);
          setShowDropdown(true);
          await fetchSuggestions(e.target.value); 
        }}
        onBlur={handleBlur}
        placeholder="Search company you have interview with..."
        errors={errors}
      />

      {errors && <p className="text-destructive text-sm">{errors}</p>}
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border mt-1 w-full shadow-md rounded text-sm">
          {suggestions.map((name, idx) => (
            <li
              key={idx}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CompanyNameSearch;