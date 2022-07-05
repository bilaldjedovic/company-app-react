import React from "react";
import "./navbar.css";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <div className="divG">
      <ul className="nav">
        <li className="li">
          <Link to="home" smooth duration={500}>
            home
          </Link>
        </li>
        <li className="li">
          <Link to="employees" smooth duration={500}>
            employees
          </Link>
        </li>
        <li className="li">
          <Link to="addEmployee" smooth duration={500}>
            add employee
          </Link>
        </li>
        <li className="li">
          <Link to="department" smooth duration={500}>
            department
          </Link>
        </li>
        <li className="li">
          <Link to="addDepartment" smooth duration={500}>
            add department
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
