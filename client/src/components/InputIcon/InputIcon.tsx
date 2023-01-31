import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export type InputIconProps = {
  hasIcon?: boolean;
  fontAwesomeIcon: IconDefinition;
  iconSize?: IconSizes;
  iconColor?: IconColors;
};

const sizes = ["small", "medium", "large"] as const;
type IconSizes = typeof sizes[number];

const colors = ["gray", "green", "red", "yellow"] as const;
type IconColors = typeof colors[number];

const baseClass = "input-icon";
const templateClasse = "absolute mx-4 bg-whites";

const sizeClasses = {
  small: "text-sm",
  medium: "text-base",
  large: "text-large",
};

const colorClasses = {
  gray: "text-gray-500",
  green: "text-green-500",
  red: "text-pink-500",
  yellow: "text-yellow-500",
};

const feedbackIconSize = "medium";
const feedbackIconColor = "green";

const InputIcon = ({
  hasIcon = false,
  fontAwesomeIcon,
  iconSize = "medium",
  iconColor = "green",
}: InputIconProps) => {
  const isValidSize = sizes.includes(iconSize);
  const isValidColor = colors.includes(iconColor);

  const sizeKey = isValidSize ? iconSize : feedbackIconSize;
  const colorKey = isValidColor ? iconColor : feedbackIconColor;

  const sizeClass = sizeClasses[sizeKey];
  const colorClass = colorClasses[colorKey];

  const classeName = `${baseClass} ${templateClasse} ${sizeClass} ${colorClass} `;
  return <FontAwesomeIcon className={classeName} icon={fontAwesomeIcon} />;
};

export default InputIcon;
