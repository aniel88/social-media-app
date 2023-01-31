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
  isValid?: boolean | undefined;
}

const baseClass = "input peer";
const templateClass =
  "w-full flex px-2 py-2.5 border-solid border rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ";

const borderColorClasses = {
  gray: "border-gray-300 ",
  green: "border-green-500",
  red: "border-pink-500 focus:border-pink-500",
};

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
  iconSize,
  isValid = undefined,
  onChange,
}: InputFormProps) => {
  const iconColorByValidation =
    isValid === undefined ? "gray" : isValid ? "green" : "red";
  const borderColorKey =
    isValid === undefined ? "gray" : isValid ? "gray" : "red";
  const borderColorClass = borderColorClasses[borderColorKey];

  const className = `${baseClass} ${templateClass} ${borderColorClass}`;
  return (
    <div className="relative flex justify-end items-center">
      {hasIcon ? (
        <InputIcon
          iconSize={iconSize}
          fontAwesomeIcon={fontAwesomeIcon}
          iconColor={iconColorByValidation}
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
