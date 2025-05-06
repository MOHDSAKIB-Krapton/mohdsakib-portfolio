import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-[80vh]">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
