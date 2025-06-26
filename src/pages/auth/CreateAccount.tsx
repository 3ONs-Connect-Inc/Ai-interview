import React, { useEffect, useState } from "react";
import CompanyForm from "../../components/auth/PersonalForm";
import useFetchCountries from "../../hooks/useFetchCountries";
import { Link, useLocation } from "react-router-dom";
import Seo from "../../components/Seo";
import PersonalForm from "../../components/auth/CompanyForm";
import { Logo } from "../../components/ui/Logo";

const CreateAccount: React.FC = () => {
  const countries = useFetchCountries();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");
  const [isCompanyUse, setIsCompanyUse] = useState(role !== "member");

  const handleToggle = (selection: boolean) => {
    setIsCompanyUse(selection);
  };

  useEffect(() => {
    setIsCompanyUse(role !== "member");
  }, [role]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen  w-full">
      <Seo
        title="Create Account"
        description="Create account page."
        name="Inkear"
        type="website"
      />
      {/* Logo - Visible on small screens only */}
      <div className="mx-4 w-40 mt-4 h-auto text-textBlack md:hidden">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      {/* Left Section - Hidden on small screens */}
      <div className="relative hidden md:flex w-1/2 min-h-screen bg-gradient-to-r from-gray-700 to-gray-900">
        {/* Background image */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-[#170055] to-[#000000] opacity-0"></div>
        <div className="absolute inset-0 h-full">
          <img
            src="/images/ppl/p3.png"
            alt="background"
            loading="lazy"
            className="w-full h-full object-cover "
          />
        </div>
        {/* Text section */}
        <div className="absolute bottom-40 left-[35px] text-background">
          <h2 className="text-4xl font-bold ">Create an Account</h2>
          <p className="mt-4 text-lg max-w-sm text-secondaryForeground font-normal ">
            Access your dashboard, manage bookings, and connect with clients
            seamlessly.
          </p>
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 mt-10 p-6 px-26 max-[1031px]:px-10  max-md:items-center max-[568px]:px-5 max-md:mt-10">
        <div className="flex bg-gray-200 rounded-lg p-1 mb-6 w-64 text-center max-[258px]:w-55">
          <div
            className={`w-1/2 py-2 rounded-lg  font-medium text-xs cursor-pointer transition-all duration-300 ${
              isCompanyUse
                ? "bg-white shadow-md text-gray-900"
                : "text-gray-600 "
            }`}
            onClick={() => handleToggle(true)}
          >
            Personal use
          </div>
          <div
            className={`w-1/2 py-2 rounded-lg  font-medium text-xs cursor-pointer transition-all duration-300 ${
              !isCompanyUse
                ? "bg-white shadow-md text-gray-900"
                : "text-gray-600"
            }`}
            onClick={() => handleToggle(false)}
          >
            Company use
          </div>
        </div>

        {/* Forms */}
        <div className="w-full max-w-md">
          {isCompanyUse ? (
            <CompanyForm countries={countries} />
          ) : (
            <PersonalForm countries={countries} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
