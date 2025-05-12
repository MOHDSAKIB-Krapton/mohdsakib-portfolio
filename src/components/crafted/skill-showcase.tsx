import React from "react";
import { IconCloud } from "../magicui/icon-cloud";

const SkillIconShow = ({ slugs = [] }: { slugs?: string[] }) => {
  if (slugs.length === 0) {
    return (
      <div className="flex-1 justify-center items-center">
        <p> Please select any category from terminal first.</p>
      </div>
    );
  }

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <div className="flex flex-1 justify-center items-center">
      <IconCloud images={images} />
    </div>
  );
};

export default SkillIconShow;
