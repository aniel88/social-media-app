/* React */
import { faCamera, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const NoPosts = () => {
  return (
    <div className="flex flex-col h-80 justify-center items-center">
      <FontAwesomeIcon className="text-4xl" icon={faCamera} />
      <div className="text-2xl">No posts yet</div>
    </div>
  );
};

export default NoPosts;
