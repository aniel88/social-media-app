/* React */
import React from "react";

interface TextProps {
  children?: string | JSX.Element | JSX.Element[];
  weight?: TextWeight;
  size?: TextSize;
  align?: TextAlign;
  padding?: Padding;
  margin?: Margins;
  href?: string;
  extraStyle?: React.CSSProperties;
  extraClassName?: string;
}

const weights = ["light", "normal", "medium", "semibold", "bold"] as const;
type TextWeight = typeof weights[number];

const sizes = ["small", "medium", "large"] as const;
type TextSize = typeof sizes[number];

const aligns = ["center", "right", "left"] as const;
type TextAlign = typeof aligns[number];

const paddings = ["p-0", "p-2", "px-2", "py-2"] as const;
type Padding = typeof paddings[number];

const margins = ["m-0", "m-2", "mx-2", "my-2"] as const;
type Margins = typeof margins[number];

const baseClass = "text";
const templateClasses = "";

const TextWeightClasses = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const TextSizeClasses = {
  small: "text-sm",
  medium: "text-baze",
  large: "text-lg",
};

const TextAlignClasses = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

const TextPaddingClasses = {
  "p-0": "p-0",
  "p-2": "p-2",
  "px-2": "px-2",
  "py-2": "py-2",
};

const TextMarginClasses = {
  "m-0": "m-0",
  "m-2": "m-2",
  "mx-2": "mx-2",
  "my-2": "my-2",
};

const feedbackTextAlign = "center";
const feedbackTextWeight = "normal";
const feedbackTextSize = "medium";
const feedbackTextPadding = "p-0";
const feedbackTextMargin = "m-0";

const Text = ({
  extraStyle,
  extraClassName,
  align = "right",
  size = "medium",
  weight = "normal",
  padding = "p-0",
  margin = "m-0",
  href,
  children,
}: TextProps) => {
  const isValidAlign = aligns.includes(align);
  const isValidSize = sizes.includes(size);
  const isValidWeight = weights.includes(weight);
  const isValidPadding = paddings.includes(padding);
  const isValidMargin = margins.includes(margin);
  const isHrefValid = href !== undefined;

  const textAlignKey = isValidAlign ? align : feedbackTextAlign;
  const textWeightKey = isValidWeight ? weight : feedbackTextWeight;
  const textSizeKey = isValidSize ? size : feedbackTextSize;
  const textPaddingKey = isValidPadding ? padding : feedbackTextPadding;
  const textMarginKey = isValidMargin ? margin : feedbackTextMargin;

  const textAlignClass = TextAlignClasses[textAlignKey];
  const textWeightClass = TextWeightClasses[textWeightKey];
  const textSizeClass = TextSizeClasses[textSizeKey];
  const textPaddingClass = TextPaddingClasses[textPaddingKey];
  const textMarginClass = TextMarginClasses[textMarginKey];

  const className = `${baseClass} ${templateClasses} ${textAlignClass} ${textWeightClass} ${textPaddingClass} ${textMarginClass} ${textSizeClass} ${extraClassName}`;

  return (
    <>
      {isHrefValid ? (
        <a href={href} style={extraStyle} className={className}>
          {children}
        </a>
      ) : (
        <div style={extraStyle} className={className}>
          {children}
        </div>
      )}
    </>
  );
};

export default Text;
