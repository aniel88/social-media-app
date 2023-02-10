/* React */
import React from "react";

export interface ISideGroupProps {
  title: string;
  imageUrl?: string;
  url: string;
}

const SideGroup = ({ title, imageUrl, url }: ISideGroupProps) => {
  return (
    <a href={url} className="flex flex-row w-full items-center mb-4">
      <div className="rounded-lg h-12 w-12 overflow-hidden">
        <img className="w-full h-full" src={imageUrl} alt="group_image" />
      </div>
      <div className="mx-3 hidden xl:block">{title}</div>
    </a>
  );
};

export default SideGroup;
