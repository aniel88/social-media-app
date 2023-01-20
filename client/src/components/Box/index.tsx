import React from "react";
import { SectionProps } from "../../models/section";

const BoxWrapper = ({ className, children }: SectionProps): JSX.Element => {
  return <div className={className}>{children}</div>;
};

export default BoxWrapper;
