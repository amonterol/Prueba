import React from "react";
import NavBar from "./NavBar";
import Notify from "./Notifiy";

function Layout({ children }) {
  return (
    <div className="container">
      {" "}
      <NavBar />
      <Notify />
      {children}
    </div>
  );
}

export default Layout;
