import React from "react";
import "../../styles/ui/Button.scss";
import { Link } from "react-router-dom";

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  label: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  image?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  to,
  onClick,
  variant = "primary",
  disabled,
  label,
  type = "button",
  className = "",
  image,
  icon,
}) => {
  const baseClasses =
    "px-6 py-2 font-semibold shadow-md dark:border-0 dark:shadow-lg dark:shadow-gray-800 rounded-lg transition duration-300 cursor-pointer";

  const content = (
    <div
      className={`${
        image || icon
          ? "flex max-md:justify-center max-xs:px-0 px-4 space-x-4 items-center"
          : ""
      }`}
    >
      <span>{label}</span>
      {image && <img src={image} alt="icon" className="w-2.5 h-2.5" />}
      {icon && !image && icon}
    </div>
  );

  if (to && !to.startsWith("#")) {
    return (
      <Link to={to} className={`${baseClasses} ${className}`}>
        {content}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${variant} ${baseClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {content}
    </button>
  );
};

export default Button;
