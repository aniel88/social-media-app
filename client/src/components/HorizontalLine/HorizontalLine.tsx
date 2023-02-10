import React from "react";

interface IHorizonalLineProps {
  customStyle?: React.CSSProperties;
  customClassName?: string;
}

const baseClass = "horizontal-line";
const templateClasses = "h-px w-full my-3";

const HorizontalLine = ({
  customStyle,
  customClassName,
}: IHorizonalLineProps) => {
  const className = `${baseClass} ${templateClasses} ${customClassName}`;
  return <div style={customStyle} className={className}></div>;
};

export default HorizontalLine;
