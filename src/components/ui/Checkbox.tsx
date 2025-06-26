import React from "react";

interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string | React.ReactNode;
  required?: boolean;
  errors?: any;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  checked,
  onChange,
  label,
  required,
  errors,
}) => {
  return (
    <div>
      <div className="relative flex items-start mb-2">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          required={required}
          className="hidden peer"
        />

        {/* Custom Checkbox with Checkmark */}
        <label 
          htmlFor={name}
          className="w-5 h-5 min-w-[20px] min-h-[20px] border-2 border-borderGray rounded-md flex items-center justify-center cursor-pointer 
                  peer-checked:bg-accent peer-checked:border-accent"
        >
          {/* SVG Checkmark: Hidden by Default, Shown When Checked */}
          {checked && (
            <svg
              fill="#fff"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </label>

        <label
          htmlFor={name}
          className="ml-3 dark:text-[var(--light)]  text-gray-700 cursor-pointer"
        >
          {label}
        </label>
      </div>
      {errors?.[name] && (
        <p className="text-destructive text-sm  mb-2">{errors[name]}</p>
      )}
    </div>
  );
};

export default Checkbox;
