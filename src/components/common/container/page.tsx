import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto py-12 md:py-24 px-4 md:px-6 lg:px-8 ">
      {children}
    </div>
  );
};

export default Container;
