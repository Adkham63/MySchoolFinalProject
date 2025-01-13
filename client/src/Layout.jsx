import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "./Banner"; // Import the Banner
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation(); // Get the current route location

  // Define routes where the footer should be displayed
  const footerRoutes = ["/", "/about", "/contact"];

  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">
      <Header />
      {/* Show Banner only on the index page */}
      {location.pathname === "/" && <Banner />}
      <div className="flex-grow">
        <Outlet />
      </div>
      {/* Render the footer on specified routes */}
      {footerRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default Layout;
