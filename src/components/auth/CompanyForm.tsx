import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext, useState } from "react";
import type { Country } from "../../types";
import { FormRenderer } from "../ui/FormRenderer";
import { companyFormFields } from "../../constants";
import { useCompanyHandler } from "../../hooks/auth/useCompanyHandler";

const CompanyForm: React.FC<{ countries: Country[] }> = ({ countries }) => {
  const { theme } = useContext(ThemeContext);
  const [isJoiningCompany, setIsJoiningCompany] = useState(false);

  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    setFormData,
    setErrors,
    formSubmitted,
    specialHandlers,
  } = useCompanyHandler(
    {
      id: "",
      companyName: "",
      firstName: "",
      lastName: "",
      companyContact: "+1",
      phoneNumber: "",
      companyEmail: "",
      password: "",
      confirmPassword: "",
      role: "Company",
    },
    isJoiningCompany
  );

  return (
    <>
      <div className="text-left">
        <h2 className="font-bold text-2xl">Sign Up</h2>
        <div className="mt-2 font-normal text-lg  mb-7">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-accent font-bold">
            Sign In
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-8">
        <input
          type="checkbox"
          id="isJoiningCompany"
          checked={isJoiningCompany}
          onChange={() => setIsJoiningCompany((prev) => !prev)}
        />
        <label htmlFor="isJoiningCompany" className="text-sm font-bold">
          I’m joining an existing company
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        <FormRenderer
          fields={companyFormFields(isJoiningCompany)}
          formData={formData}
          errors={errors}
          setErrors={setErrors}
          handleChange={handleChange}
          specialHandlers={{
            handleCompanyEmailBlur: specialHandlers.handleCompanyEmailBlur,
            handleCompanyNameBlur: () =>
              specialHandlers.handleCompanyNameBlur(isJoiningCompany),
          }}
          setFormData={setFormData}
          countries={countries}
          theme={theme === "system" ? undefined : theme}
          formSubmitted={formSubmitted}
        />

        <div className="items-center flex justify-center">
          <Button
            disabled={loading}
            label={loading ? "Loading..." : "Create Account"}
            type="submit"
            className="w-full  mt-4 transition"
          />
        </div>
      </form>
    </>
  );
};

export default CompanyForm;
