/* React */
import React from "react";

interface IHamburgerProps {
  onClick?: () => React.MouseEventHandler<HTMLButtonElement> | void;
}

const Hamburger = ({ onClick }: IHamburgerProps) => {
  return (
    <button
      onClick={onClick}
      className="flex md:hidden flex-col justify-between h-6 w-8 m-2 cursor-pointer "
    >
      <div className="w-full h-1 bg-white" />
      <div className="w-full h-1 bg-white" />
      <div className="w-full h-1 bg-white" />
    </button>
  );
};

export default Hamburger;
