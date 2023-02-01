/* React */
import React from "react";

interface HrefProps {
  href: string;
  children?: React.ReactNode;
}

const Href = ({ href, children }: HrefProps) => {
  return <a href={href}>{children}</a>;
};

export default Href;
