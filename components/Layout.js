import React from "react";
import NavBar from "./NavBar";
import Notify from "./Notifiy";
import Modal from "./Modal";

function Layout({ children }) {
  return (
    <div className="container">
      {" "}
      <NavBar />
      <Notify />
      <Modal />
      {children}
    </div>
  );
}

export default Layout;
