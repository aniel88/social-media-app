/* React */
import React from "react";

interface TextProps {
  children?: string;
  weight?: TextWeight;
  size?: TextSize;
  align?: TextAlign;
  extraStyle?: React.CSSProperties;
}

const weights = ["light", "normal", "medium", "semibold", "bold"] as const;
type TextWeight = typeof weights[number];

const sizes = ["small", "medium", "large"] as const;
type TextSize = typeof sizes[number];

const aligns = ["center", "right", "left"] as const;
type TextAlign = typeof aligns[number];

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

const feedbackTextAlign = "center";
const feedbackTextWeight = "normal";
const feedbackTextSize = "medium";

const Text = ({
  extraStyle,
  align = "right",
  size = "medium",
  weight = "normal",
  children,
}: TextProps) => {
  const isValidAlign = aligns.includes(align);
  const isValidSize = sizes.includes(size);
  const isValidWeight = weights.includes(weight);

  const textAlignKey = isValidAlign ? align : feedbackTextAlign;
  const textWeightKey = isValidWeight ? weight : feedbackTextWeight;
  const textSizeKey = isValidSize ? size : feedbackTextSize;

  const textAlignClass = TextAlignClasses[textAlignKey];
  const textWeightClass = TextWeightClasses[textWeightKey];
  const textSizeClass = TextSizeClasses[textSizeKey];

  const className = `${baseClass} ${templateClasses} ${textAlignClass} ${textWeightClass} ${textSizeClass}`;

  return (
    <div style={extraStyle} className={className}>
      {children}
    </div>
  );
};

export default Text;
