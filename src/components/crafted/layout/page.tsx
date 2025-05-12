import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] ">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
