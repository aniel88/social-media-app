/* React */
import React from "react";

interface BoxProps {
  children?: React.ReactNode;
  extraStyle?: React.CSSProperties;
  flexDirection?: FlexDirection;
}

const directions = ["row", "column"] as const;
type FlexDirection = typeof directions[number];

const flexDirectionsClasses = {
  row: "flex-row",
  column: "flex-col",
};

const baseClass = "box";
const templateClasses =
  "flex shrink-1 justify-center items-center bg-white p-0 h-auto w-auto rounded-lg overflow-hidden shadow-2xl";

const feedbackFlexDirections = "row";

const Box = ({
  flexDirection = "row",
  extraStyle,
  children,
}: BoxProps): JSX.Element => {
  const isValidFlexDirection = directions.includes(flexDirection);

  const flexDirectionKey = isValidFlexDirection
    ? flexDirection
    : feedbackFlexDirections;

  const flexDirectionClass = flexDirectionsClasses[flexDirectionKey];

  const className = `${baseClass} ${templateClasses} ${flexDirectionClass}`;

  return (
    <div className={className} style={extraStyle}>
      {children}
    </div>
  );
};

export default Box;
