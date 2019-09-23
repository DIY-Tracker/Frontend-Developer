import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export const Navbar = () => {
    return (

    <div className="navBar">
      <Link className="styledLink" to="/login">Login</Link>
      <Link className="styledLink" to="/signup">Sign Up</Link>
    </div>

    )
}