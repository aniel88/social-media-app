/* React */
import React from "react";

export interface ISideGroupProps {
  title: string;
  imageUrl?: string;
  url: string;
}

const SideGroup = ({ title, imageUrl, url }: ISideGroupProps) => {
  return (
    <a
      href={url}
      className="flex flex-row w-full relative items-center mb-4 group"
    >
      <div className="rounded-lg h-12 w-12 overflow-hidden ">
        <img className="w-full h-full" src={imageUrl} alt="group_image" />
      </div>
      <div className="mx-3 absolute text-center xl:text-left xl:relative right-11 xl:right-0 bg-white xl:bg-transparent rounded-2xl xl:rounded-none p-3 xl:p-0 xl:block hidden group-hover:block">
        {title}
      </div>
    </a>
  );
};

export default SideGroup;
