
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../../firebase/config";
import { confirmPasswordReset } from "firebase/auth";

const usePasswordReset = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const oobCode = searchParams.get("oobCode");

  const validatePasswords = () => {
      const errors: { password?: string; confirmPassword?: string } = {};
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;

      if (!newPassword.trim()) {
          errors.password = "Password is required.";
      } else if (newPassword.length !== 8) {
          errors.password = "Password must be exactly 8 characters.";
      } else if (!passwordRegex.test(newPassword)) {
          errors.password = "Must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
      }

      if (!confirmPassword.trim()) {
          errors.confirmPassword = "Confirm Password is required.";
      } else if (newPassword !== confirmPassword) {
          errors.confirmPassword = "Passwords do not match.";
      }

      return errors;
  };

  const handlePasswordReset = async () => {
      setLoading(true);
      setMessage("");
      setErrors({});

      if (!oobCode) {
          setMessage("Invalid reset request.");
          setLoading(false);
          return;
      }

      const validationErrors = validatePasswords();
      if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          setLoading(false);
          return;
      }

      try {
          await confirmPasswordReset(auth, oobCode, newPassword);
          setMessage("✅ Password reset successful! Redirecting...");
          setTimeout(() => {
              setLoading(false);
              navigate("/password-success");
          }, 3000);
      } catch (error: any) {
          console.error("Error resetting password:", error);
          setMessage("⚠️ Failed to reset password. Please try again.");
      } finally {
       //   setLoading(false);
      }
  };

  return {
      newPassword,
      setNewPassword,
      confirmPassword,
      setConfirmPassword,
      errors,
      message,
      setMessage,
      loading,
      setLoading,
      setErrors,
      handlePasswordReset,
      searchParams
  };
};

export default usePasswordReset;