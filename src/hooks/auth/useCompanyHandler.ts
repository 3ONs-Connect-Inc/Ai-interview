import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase/config";
import { companyValidation } from "../../utils/validations/companyValidation";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../../utils/functions";
import { type User } from "../../types";
import { checkFieldExists } from "../../firebase/companies";
import { useNavigate } from "react-router-dom";

export const useCompanyHandler = (
  defaultFormData: any,
  isJoiningCompany: boolean
) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    let filteredValue = value;
    if (name === "firstName" || name === "lastName") {
      filteredValue = value.replace(/[^A-Za-z'-."]/g, "");
    }

    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : filteredValue,
    }));

    // Remove error dynamically
    if (errors[name as keyof User]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name as keyof User];
        return updatedErrors;
      });
    }
  };
  const handleCompanyEmailBlur = async () => {
    if (!formData.companyEmail) return;
    const exists = await checkFieldExists(
      "companyEmail",
      formData.companyEmail
    );
    if (exists) {
      setErrors((prev) => ({ ...prev, companyEmail: "Email already exists." }));
      toast.error("Email already exists.");
    }
  };

  const handleCompanyNameBlur = async (isJoiningCompany: boolean) => {
    if (isJoiningCompany || !formData.companyName) return; //  skip check if joining

    const exists = await checkFieldExists("companyName", formData.companyName);
    if (exists) {
      setErrors((prev) => ({
        ...prev,
        companyName: "Company name already exists.",
      }));
      toast.error("Company name already exists.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    const validationErrors = companyValidation(formData);

    // 🔒 Check for email and name uniqueness
    const [emailExists, nameExists] = await Promise.all([
      checkFieldExists("companyEmail", formData.companyEmail),
      checkFieldExists("companyName", formData.companyName),
    ]);

    if (emailExists) {
      validationErrors.companyEmail = "Email already exists.";
      toast.error("Email already exists.");
    }
    if (!isJoiningCompany && nameExists) {
      validationErrors.companyName = "Company name already exists.";
      toast.error("Company name already exists.");
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) {
      console.log("Validation failed:", validationErrors);
      return;
    }

    setLoading(true);
    try {
      const companyId = uuidv4();
      const userId = uuidv4();
      // Encrypt the password
      const hashedPassword = await hashPassword(formData.password);

      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.companyEmail,
        formData.password
      );
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });
      if (formData.role === "Company") {
        const contactInfo = `${formData.companyContact} - ${formData.phoneNumber}`;
        const userData: User = {
          id: userId,
          companyId,
          companyName: formData.companyName,
          normalizedCompanyName: formData.companyName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          companyContact: formData.companyContact,
          phoneNumber: formData.phoneNumber,
          contactInfo: contactInfo,
          companyEmail: formData.companyEmail,
          password: hashedPassword,
          confirmPassword: hashedPassword,
          role: formData.role,
          timestamp: serverTimestamp(),
          emailVerified: true,
        };
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, userData);
      }
      await signOut(auth);
      navigate("/sign-in");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("The email address is already in use by another account.");
      } else {
        toast.error(`Registration failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    formData,
    errors,
    handleChange,
    handleSubmit,
    setFormData,
    setErrors,
    isJoiningCompany,
    formSubmitted,
    specialHandlers: {
      handleCompanyEmailBlur,
      handleCompanyNameBlur,
    },
  };
};
