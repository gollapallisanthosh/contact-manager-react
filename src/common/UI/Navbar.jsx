import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
   return (
    <>
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">

          {/* BRAND */}
          <Link
            to="/contacts/list"
            className="navbar-brand d-flex align-items-center fw-bold"
          >
            <i className="bi bi-person-lines-fill fs-4 text-warning me-2"></i>
            Contact <span className="text-warning ms-1">Manager</span>
          </Link>

        </div>
      </nav>

      {/* ROUTE CONTENT */}
      <Outlet />
    </>
  );
};
export default Navbar;
