import React from "react";
import logoUrl from "../../utils/logo.png";
import { LogoProps } from "../../models/logo";

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={className}>
      <img src={logoUrl} alt="Logo image" />
    </div>
  );
};

export default Logo;
