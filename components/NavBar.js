import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Gestión de Propiedades
      </a>
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
            <a className="nav-item nav-link">Property</a>
          </Link>
          <Link href="/create">
            <a className="nav-item nav-link">Create Property</a>
          </Link>
          <Link href="/propertyTypes">
            <a className="nav-item nav-link">Property Types</a>
          </Link>
          <Link href="/owners">
            <a className="nav-item nav-link">Owners</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
