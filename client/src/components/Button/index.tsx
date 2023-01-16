import React, { ForwardedRef, ReactNode } from "react";
import { JsxEmit } from "typescript";

type ButtonProps = {
  /**
   * @type {(string | ReactNode)}
   */
  children: string | ReactNode;

  /**
   * @defaultValue 'false'
   * @type {boolean}
   */
  isDisabled?: boolean;

  /**
   * @defaultValue 'medium'
   * @type {ButtonSize}
   */
  size?: ButtonSize;

  /**
   * @defaultValue "primary"
   * @type {ButtonVariant}
   */
  variant?: ButtonVariant;

  /**
   * @type {string}
   */
  extraClasses?: string;

  onClick: Function | undefined;
};

const sizes = ["small", "medium", "large"] as const;
type ButtonSize = typeof sizes[number];

const variants = [
  "primary",
  "secondary",
  "danger",
  "white",
  "transparent",
] as const;
type ButtonVariant = typeof variants[number];

/**
 * Base class to identify and debug the component
 */
const baseClass = "button";

/**
 * Default template classes TW for base structure
 */
const templateClasses = "inline-flex";

export const themeClasses = {
  primary:
    "bg-primary-500 hover:bg-primary-600 focus:ring-primary-400  disabled:opacity-50 disabled:bg-primary-500 text-white border border-transparent",
  secondary:
    "bg-primary-200 hover:bg-primary-300 focus:ring-primary-400 disabled:opacity-50 disabled:bg-primary-200 text-white border border-transparent",
  danger:
    "bg-danger-500 hover:bg-danger-600 focus:ring-primary-400 disabled:opacity-50 disabled:bg-danger-500 text-white border border-transparent",
  white:
    "bg-white hover:bg-gray-100 focus:ring-primary-500 disabled:opacity-50 text-gray-700 border border-gray-400",
  transparent:
    "bg-primary-0 hover:bg-primary-400 focus:outline-none focus:ring-primary-500 disabled:opacity-50 text-primary-600 shadow-none",
};

export const sizingClasses = {
  small: "px-2.5 py-1.5 text-xs",
  medium: "px-4 py-2.5 text-sm",
  large: "px-6 py-3 text-base",
};

const fallbackSize = "medium";
const fallbackVariant = "primary";

/**
 * Renders a Button component
 */
const Button = React.forwardRef(
  (
    {
      size = "medium",
      isDisabled = false,
      variant = "primary",
      extraClasses = "",
      children,
    }: ButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ): JSX.Element => {
    const isValidSize = sizes.includes(size);
    const sizeKey = isValidSize ? size : fallbackSize;
    const isValidVariant = variants.includes(variant);
    const variantKey = isValidVariant ? variant : fallbackVariant;
    const sizeClass = sizingClasses[sizeKey];
    const variantClass = themeClasses[variantKey];
    const classes = `${templateClasses} ${baseClass} ${sizeClass} ${variantClass} ${extraClasses}`;
    console.warn(`dasdasdasd`);
    return (
      <button className={classes} disabled={isDisabled}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
