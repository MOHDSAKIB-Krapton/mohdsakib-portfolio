import React from "react";

export type InfoTagProps = {
  title?: string;
  description?: string;
  isHovered?: boolean;
};

const InfoTag = ({ title, description, isHovered }: InfoTagProps) => {
  return (
    <div
      className={`p-4 backdrop-blur-sm bg-black/20 rounded-lg transition-all ease-in-out duration-500 ${
        isHovered ? "opacity-70 hover:opacity-100" : "opacity-100"
      }`}
    >
      {title && <h4 className="text-blue-400 font-medium mb-2">{title}</h4>}
      {description && <p className="text-sm text-gray-400">{description}</p>}
    </div>
  );
};

export default InfoTag;
