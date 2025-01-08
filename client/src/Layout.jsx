import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation(); // Get the current route location

  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      {/* Render the footer only on the index page */}
      {location.pathname === "/" && <Footer />}
    </div>
  );
};

export default Layout;
  