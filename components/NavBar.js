import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();
  const isActive = (r) => {
    r === router.pathname ? " active" : "";
  };

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
          <Link href="/propiedad">
            <a className="nav-item nav-link active">
              Propiedades
              <span className="sr-only">(current)</span>
            </a>
          </Link>
          <Link href="/tiposPropiedad">
            <a className="nav-item nav-link">Tipos de Propiedades</a>
          </Link>
          <Link href="/propietario">
            <a className="nav-item nav-link">Dueños</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
