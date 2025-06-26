import { useState, useEffect } from "react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import type { Country } from "../types";


const useFetchCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = () => {
      const countryList: Country[] = getCountries().map((country) => ({
        code: `+${getCountryCallingCode(country)}`,
        name: country,
      }));
      setCountries(countryList);
    };

    fetchCountries();
  }, []);

  return countries;
};

export default useFetchCountries;
