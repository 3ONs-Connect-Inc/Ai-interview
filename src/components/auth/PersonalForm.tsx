import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { ThemeContext } from "../../context/ThemeContext";
import type { Country } from "../../types";
import { FormRenderer } from "../ui/FormRenderer";
import { personalFormFields } from "../../constants";
import { usePersonalHandler } from "../../hooks/auth/usePersonalHandler";

const PersonalForm: React.FC<{ countries: Country[] }> = ({ countries }) => {
  const { theme } = useContext(ThemeContext);
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    setFormData,
    setErrors,
  } = usePersonalHandler({
    id: "",
    firstName: "",
    companyName: "",
    lastName: "",  
    companyContact: "+1",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  return (
    <div>
      <div className="text-left">
        <h2 className="font-bold text-2xl">Sign Up</h2>
        <div className="mt-2 font-normal text-lg  mb-7 ">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-accent font-bold">
            Sign In
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <FormRenderer
          fields={personalFormFields}
          formData={formData}
          errors={errors}
          setErrors={setErrors}
          handleChange={handleChange}
          setFormData={setFormData}
          countries={countries}
          theme={theme === "system" ? undefined : theme}
        />

        <div className="items-center flex justify-center">
          <Button
            type="submit"
            disabled={loading}
            label={loading ? "Loading..." : "Create Account"}
            className="w-full  mt-4 mb-4 transition"
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalForm;
