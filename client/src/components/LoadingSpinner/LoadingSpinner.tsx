/* React */
import React, { useState } from "react";

/* React Spinner */
import { MagnifyingGlass } from "react-loader-spinner";

interface LoadingSpinnerProps {
  show?: boolean;
}

const baseClass = "loading-spinner";
const templateClasses =
  "absolute flex justify-center items-center z-50 h-screen w-screen ";

const LoadingSpinner = ({ show = false }: LoadingSpinnerProps) => {
  const className = `${baseClass} ${templateClasses}`;
  console.log(show);
  const renderLoadingSpinner = () => {
    return (
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(119,68,162,0.78) 0%, rgba(119,68,162,0.7791491596638656) 100%)",
        }}
        className={className}
      >
        <MagnifyingGlass
          visible={true}
          height="150"
          width="150"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#ffffff"
        />
      </div>
    );
  };
  return <>{show ? renderLoadingSpinner() : ""}</>;
};

export default LoadingSpinner;
