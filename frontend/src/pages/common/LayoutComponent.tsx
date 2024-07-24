import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";

const LayoutComponent = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};

export default LayoutComponent;
