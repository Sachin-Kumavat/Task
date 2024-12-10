import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const[isClicked, setIsClicked] = useState(false);


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Employee Management</h1>
        <ul className={`navbar-links ${isClicked ? 'open' : ''}`}>
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/employees" className="navbar-link">AddEmployees</Link>
          </li>
        </ul>
        <button className="navbar-toggle" onClick={()=>setIsClicked(!isClicked)}>
          <span className="navbar-toggle-icon">☰</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;