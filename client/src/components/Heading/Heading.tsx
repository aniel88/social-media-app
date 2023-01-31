/* React */
import React from "react";

interface HeadingProps {
  type?: HeadingType;
  extraStyle?: React.CSSProperties;
  children?: React.ReactNode;
  weight?: HeadingWeight;
  align?: HeadingAlign;
}

const types = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
type HeadingType = typeof types[number];

const weights = ["light", "normal", "medium", "semibold", "bold"] as const;
type HeadingWeight = typeof weights[number];

const aligns = ["center", "left", "right"] as const;
type HeadingAlign = typeof aligns[number];

const HeadingTypeClasses = {
  h1: "text-6xl",
  h2: "text-4xl",
  h3: "text-3xl",
  h4: "text-2xl",
  h5: "text-xl",
  h6: "text-base",
};

const HeadingWeightClasses = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const HeadingAlignClasses = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

const baseClass = "heading";
const templateClasses = "";

const feedbackHeadingType = "h3";
const feedbackHeadingWight = "normal";
const feedbackHeadingAlign = "left";

const Heading = ({
  type = "h3",
  weight = "normal",
  extraStyle,
  align = "right",
  children,
}: HeadingProps) => {
  const isValidHeadingType = types.includes(type);
  const isValidHeadingWeight = weights.includes(weight);
  const isValidHeadingAlign = aligns.includes(align);

  const headingTypeKey = isValidHeadingType ? type : feedbackHeadingType;
  const headingWeightKey = isValidHeadingWeight ? weight : feedbackHeadingWight;
  const headingAlignKey = isValidHeadingAlign ? align : feedbackHeadingAlign;

  const headingTypeClass =
    HeadingTypeClasses[headingTypeKey as keyof typeof HeadingTypeClasses];
  const headingWeightClass =
    HeadingWeightClasses[headingWeightKey as keyof typeof HeadingWeightClasses];
  const headingAlignClass =
    HeadingAlignClasses[headingAlignKey as keyof typeof HeadingAlignClasses];

  const className = `${baseClass} ${templateClasses} ${headingTypeClass} ${headingWeightClass} ${headingAlignClass}`;

  const renderHeading = () => {
    switch (headingTypeKey) {
      case "h1":
        return (
          <h1 style={extraStyle} className={className}>
            {children}
          </h1>
        );
      case "h2":
        return (
          <h2 style={extraStyle} className={className}>
            {children}
          </h2>
        );
      case "h3":
        return (
          <h3 style={extraStyle} className={className}>
            {children}
          </h3>
        );
      case "h4":
        return (
          <h4 style={extraStyle} className={className}>
            {children}
          </h4>
        );
      case "h5":
        return (
          <h5 style={extraStyle} className={className}>
            {children}
          </h5>
        );
      case "h6":
        return (
          <h6 style={extraStyle} className={className}>
            {children}
          </h6>
        );
    }
  };
  return <>{renderHeading()}</>;
};

export default Heading;
