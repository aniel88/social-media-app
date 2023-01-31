/* React */
import React from "react";

interface ContainerProps {
  children?: React.ReactNode;
  display?: ContainerDisplay;
  textAlign?: ContainerTextAlign;
  justifyContent?: ContainerJustifyContent;
  alignItem?: ContainerAlignItems;
  flexDirection?: ContainerFlexDirection;
  maxWidth?: ContainerMaxWidth;
  width?: ContainerWidth;
  height?: ContainerHeight;
  customStyle?: React.CSSProperties;
}

const displays = ["flex", "grid"] as const;
type ContainerDisplay = typeof displays[number];

const aligns = ["center", "left", "right", "start", "end"] as const;
type ContainerTextAlign = typeof aligns[number];

const justifies = [
  "start",
  "end",
  "center",
  "between",
  "around",
  "evenly",
] as const;
type ContainerJustifyContent = typeof justifies[number];

const directions = ["row", "column", "row-reverse", "col-reverse"] as const;
type ContainerFlexDirection = typeof directions[number];

const alignItems = ["start", "end", "center", "baseline", "strech"];
type ContainerAlignItems = typeof alignItems[number];

const maxWidths = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"];
type ContainerMaxWidth = typeof maxWidths[number];

const widths = [
  "1/2",
  "1/3",
  "2/3",
  "1/4",
  "2/4",
  "3/4",
  "auto",
  "full",
  "screen",
] as const;
type ContainerWidth = typeof widths[number];

const heights = [
  "1/2",
  "1/3",
  "2/3",
  "1/4",
  "2/4",
  "3/4",
  "auto",
  "full",
  "screen",
  "auto",
] as const;
type ContainerHeight = typeof heights[number];

const baseClass = "container";
const templateClasses = "p-1";

const displayClasses = {
  flex: "flex",
  grid: "grid",
};

const textAlignClasses = {
  center: "text-center",
  right: "text-right",
  left: "text-left",
  justify: "text-justify",
  start: "text-start",
  end: "text-end",
};

const justifyClasses = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const flexDirectionClasses = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  col: "flex-col",
  "col-reverse": "flex-col-reverse",
};

const alignItemsClasses = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  strech: "items-stretch",
};

const maxWidthClasses = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  xl2: "max-w-2xl",
  xl3: "max-w-3xl",
  full: "max-w-full",
};

const widthClasses = {
  "1/2": "w-1/2",
  "1/3": "w-1/3",
  "2/3": "w-2/3",
  "1/4": "w-1/4",
  "2/4": "w-2/4",
  "3/4": "w-3/4",
  auto: "w-auo",
  full: "w-full",
  screen: "w-screen",
};

const heightClasses = {
  "1/2": "h-1/2",
  "1/3": "h-1/3",
  "2/3": "h-2/3",
  "1/4": "h-1/4",
  "2/4": "h-2/4",
  "3/4": "h-3/4",
  auto: "h-auto",
  full: "h-full",
  screen: "h-screen",
};

const feedbackDisplay = "flex";
const feedbackTextAling = "center";
const feedbackJustifyContent = "center";
const feedbackAlignItems = "center";
const feedbackMaxWidth = "full";
const feedbackWidth = "full";
const feedbackHeight = "full";
const feedbackFlexDirection = "row";

const Container = ({
  display = "flex",
  textAlign = "center",
  justifyContent = "center",
  alignItem = "center",
  maxWidth = "full",
  width = "full",
  height = "auto",
  flexDirection = "row",
  children,
  customStyle,
}: ContainerProps) => {
  const isValidDisplay = displays.includes(display);
  const isValidTextAlign = aligns.includes(textAlign);
  const isValidJustifyContent = justifies.includes(justifyContent);
  const isValidAlignItem = alignItems.includes(alignItem);
  const isValidMaxWidth = maxWidths.includes(maxWidth);
  const isValidWidth = widths.includes(width);
  const isValidHeight = heights.includes(height);
  const isValidFlexDireciton = directions.includes(flexDirection);

  const displayKey = isValidDisplay ? display : feedbackDisplay;
  const textAlignKey = isValidTextAlign ? textAlign : feedbackTextAling;
  const justifyContentKey = isValidJustifyContent
    ? justifyContent
    : feedbackJustifyContent;
  const alignItemsKey = isValidAlignItem ? alignItem : feedbackAlignItems;
  const maxWidthKey = isValidMaxWidth ? maxWidth : feedbackMaxWidth;
  const widthKey = isValidWidth ? width : feedbackWidth;
  const heightKey = isValidHeight ? height : feedbackHeight;
  const flexDirectionKey = isValidFlexDireciton
    ? flexDirection
    : feedbackFlexDirection;

  const displayClass = displayClasses[displayKey];
  const textAlignClass = textAlignClasses[textAlignKey];
  const justifyContentClass = justifyClasses[justifyContentKey];
  const alignItemsClass =
    alignItemsClasses[alignItemsKey as keyof typeof alignItemsClasses];
  const maxWidthClass =
    maxWidthClasses[maxWidthKey as keyof typeof maxWidthClasses];
  const widthClass = widthClasses[widthKey];
  const heightClass = heightClasses[heightKey];
  const flexDirectionClass =
    flexDirectionClasses[flexDirectionKey as keyof typeof flexDirectionClasses];

  const className = `${baseClass} ${templateClasses} ${displayClass} ${textAlignClass} ${justifyContentClass} ${alignItemsClass} ${maxWidthClass} ${widthClass} ${heightClass} ${flexDirectionClass}`;

  return (
    <div style={customStyle} className={className}>
      {children}
    </div>
  );
};

export default Container;
