import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (

    <div className="navBar">
      <Link className="styledLink" to="/login">Login</Link>
      <Link className="styledLink" to="/signup">Sign Up</Link>
      <Link className="styledLink" to="/allprojects">See Projects</Link>
      <Link className="styledLink" to="/users/:userId/add">Create Project</Link>

    </div>

    )
}