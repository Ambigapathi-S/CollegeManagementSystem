import React from "react";
import { isUserLoggedIn } from "../../services/AuthService";

const HeaderComponent = () => {
  const isAuth = isUserLoggedIn();
  function toggleNavbar() {
    const navbar = document.querySelector("#navbar");
    navbar?.classList.toggle("active");
  }
  return (
    <>
      <header>
        <h1>ZIT College</h1>
        <h4>Library Management System</h4>
      </header>
      {isAuth && (
        <button className="btn mob-display" onClick={() => toggleNavbar()}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}
    </>
  );
};

export default HeaderComponent;
