import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link href="/">
        <a className="navbar-brand">Prueba</a>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav">
          <Link href="/">
            <a className="nav-item nav-link btn-outline-info">Properties</a>
          </Link>

          <Link href="/propertyTypes">
            <a className="nav-item nav-link btn-outline-info">Property Types</a>
          </Link>
          <Link href="/owners">
            <a className="nav-item nav-link btn-outline-info">Owners</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
