import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase/config";
import { userValidation } from "../../utils/validations/userValidation";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../../utils/functions";
import { type User } from "../../types";
import { useNavigate } from "react-router-dom";

export const usePersonalHandler = (defaultFormData: any) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    const validationErrors = userValidation(formData);

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) {
      console.log("Validation failed:", validationErrors);
      return;
    }

    setLoading(true);
    try {
      const userId = uuidv4();
      // Encrypt the password
      const hashedPassword = await hashPassword(formData.password);

      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      if (formData.role === "User") {
        const contactInfo = `${formData.companyContact} - ${formData.phoneNumber}`;
        const userData: User = {
          id: userId,
          firstName: formData.firstName,
          lastName: formData.lastName,  
            companyName: formData.companyName,
          companyContact: formData.companyContact,
          phoneNumber: formData.phoneNumber,
          contactInfo: contactInfo,
          email: formData.email,
          password: hashedPassword,
          confirmPassword: hashedPassword,
          role: formData.role,
          timestamp: serverTimestamp(),
          emailVerified: true,
        };
        const userRef = doc(db, "users", userCredential.user.uid);

        await setDoc(userRef, userData);
      }

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
    formSubmitted,
  };
};
