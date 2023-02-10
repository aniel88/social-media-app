/* React */
import React from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const baseClass = "search-container";
const templateClasses =
  "flex justify-start items-center w-1/3 h-8 p-0.5 rounded-2xl bg-white cursor-pointer border focus:border-red-500";

const searchIconBaseClass = "search-icon";
const searchIconTemplateClasses = "flex mx-2 text-gray-500";

const TextAreaBaseClass = "search";
const TextAreaTemplateClasses =
  "flex h-full mx-2 w-full p-0 resize-none border-transparent focus:border-transparent focus:ring-0 !outline-none";

const Search = () => {
  const className = `${baseClass} ${templateClasses}`;
  const fontAwesomeClassName = `${searchIconBaseClass} ${searchIconTemplateClasses}`;
  const textAreaClassName = `${TextAreaBaseClass} ${TextAreaTemplateClasses}`;

  return (
    <div className={className}>
      <FontAwesomeIcon
        className={fontAwesomeClassName}
        icon={faMagnifyingGlass}
      />
      <textarea className={textAreaClassName} placeholder="Search"></textarea>
    </div>
  );
};

export default Search;
