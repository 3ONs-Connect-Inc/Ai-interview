
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import type { FormErrors, User } from "../../types";

const validCountryCodes = new Set(
  getCountries().map((country) => `+${getCountryCallingCode(country)}`)
);

export const userValidation = (
  formData: User,  
): Partial<Record<keyof User, string>> => {
  const errors: FormErrors = {};


  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;
  const phoneRegex = /^\d{10}$/;
  // const countryCodeRegex = /^\\d$/;
  const nameRegex = /^[A-Za-z'-."]+$/;
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.companyName?.trim()) {
    errors.companyName = "Company name is required.";
  }


  // Validate firstName
  if (!formData.firstName?.trim()) {
    errors.firstName = "First name is required.";
  } else if (!nameRegex.test(formData.firstName)) {
    errors.firstName =
      "First name can only contain alphabetic characters, apostrophes ('), periods (.), and hyphens (-).";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(formData.email)) {
    errors.email =
      "Please enter a valid email address in 'test@example.com' format";
  }
  
  // Validate lastName
  if (!formData.lastName?.trim()) {
    errors.lastName = "Last name is required.";
  } else if (!nameRegex.test(formData.lastName)) {
    errors.lastName =
      "Last name can only contain alphabetic characters, apostrophes ('), periods (.), and hyphens (-).";
  }


  // Validate companyContact (country code)
  if (!formData.companyContact?.trim()) {
    errors.companyContact = "Country code is required.";
  } else if (!validCountryCodes.has(formData.companyContact)) {
    errors.companyContact = "Please enter a valid country code.";
  }

  if (!formData.phoneNumber?.trim()) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!phoneRegex.test(formData.phoneNumber)) {
    errors.phoneNumber = "Phone number must be 10 digits.";
  }


  if (!formData.password?.trim()) {
    errors.password = "Password is required.";
  } else if (formData.password.length < 8) {
    errors.password =
      "Password must be at least 8 characters and must contain at least 1 uppercase letter, one lowercase letter, one number, and one special character";
  } else if (formData.password.length > 8) {
    errors.password =
      "Password must not exceed 8 characters and must contain at least 1 uppercase letter, one lowercase letter, one number, and one special character";
  } else if (!passwordRegex.test(formData.password)) {
    errors.password =
      "Password  must contain at least 1 uppercase letter, one lowercase letter, one number, and one special character";
  }

  if (!formData.confirmPassword?.trim()) {
    errors.confirmPassword = "Password is required.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword =
      "Passwords do not match.  Please enter the same password in both fields";
  }

  return errors;
};
