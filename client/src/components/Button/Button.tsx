import React from "react";

type ButtonProps = {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  extraStyle?: React.CSSProperties;
  type?: ButtonType;
  onClick?: () => React.MouseEventHandler<HTMLButtonElement> | void;
};

const variants = [
  "primary",
  "secondary",
  "danger",
  "white",
  "transparent",
] as const;
type ButtonVariant = typeof variants[number];

const sizes = ["small", "medium", "large"] as const;
type ButtonSize = typeof sizes[number];

const types = ["button", "submit", "reset"] as const;
type ButtonType = typeof types[number];

const baseClass = "button";
const templateClasses = "flex item-center justify-center";

const variantClasses = {
  primary:
    "bg-purple-500 text-white hover:bg-purple-400 disabled:bg-purple-400 border border-transparent",
  secondary:
    "bg-blue-500 text-white hover:bg-blue-400 disabled:bg-blue-400 border border-transparent",
  danger:
    "bg-red-500 text-white hover:bg-red-400 disabled:bg-red-400 border border-transparent",
  white:
    "bg-gray-50 text-black hover:bg-gray-200 disabled:bg-gray-200 border border-transparent",
  transparent:
    "bg-transparent text-black hover:bg-gray-200 disabled:bg-gray-200 border border-gray-50",
};

const sizeClasses = {
  small: "px-2.5 py-1.5 text-sm rounded-lg",
  medium: "px-3.5 py-2.5 text-base rounded-lg",
  large: "px-4 py-3.5 text-lg rounded-lg",
};

const variantFeedback = "primary";
const sizeFeedback = "medium";
const typeFeedback = "button";

const Button = ({
  variant = "primary",
  size = "medium",
  isDisabled = false,
  extraStyle,
  type = "button",
  children,
  onClick,
}: ButtonProps) => {
  const isValidSize = sizes.includes(size);
  const isValidVariant = variants.includes(variant);
  const isValidType = types.includes(type);

  const sizeKey = isValidSize ? size : sizeFeedback;
  const variantKey = isValidVariant ? variant : variantFeedback;
  const typeButton = isValidType ? type : typeFeedback;

  const sizeClass = sizeClasses[sizeKey];
  const variantClass = variantClasses[variantKey];

  const className = `${baseClass} ${templateClasses} ${sizeClass} ${variantClass}`;
  return (
    <button
      style={extraStyle}
      className={className}
      disabled={isDisabled}
      type={typeButton}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
