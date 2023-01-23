import React from "react";
import InputIcon, { InputIconProps } from "../InputIcon/InputIcon";
import { faUser } from "@fortawesome/free-solid-svg-icons";
interface InputFormProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputIconProps {
  extraStyle?: React.CSSProperties;
  children?: React.ReactNode;
  error?: string;
  placeholder?: string;
  pattern?: string;
  
}

const baseClass = "input peer";
const templateClass =
  "w-full flex px-2 py-2.5 border-solid border rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ";
const Input = ({
  extraStyle,
  children,
  type,
  id,
  disabled,
  placeholder,
  pattern,
  required,
  hasIcon = false,
  fontAwesomeIcon = faUser,
  iconColor,
  iconSize,
  onChange,
}: InputFormProps) => {
  const className = `${baseClass} ${templateClass}`;

  return (
    <div className="relative flex justify-end items-center">
      {hasIcon ? (
        <InputIcon
          iconSize={iconSize}
          iconColor={iconColor}
          fontAwesomeIcon={fontAwesomeIcon}
        />
      ) : (
        ""
      )}
      <input
        id={id}
        type={type}
        required={required}
        style={extraStyle}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        pattern={pattern}
        className={className}
      >
        {children}
      </input>
    </div>
  );
};

export default Input;
