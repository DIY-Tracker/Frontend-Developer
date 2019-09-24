import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (

    <div className="navBar">
      <Link className="styledLink" to="/login">Login</Link>
      <Link className="styledLink" to="/signup">Sign Up</Link>
      <Link className="styledLink" to="/editproject">Edit Project</Link>

    </div>

    )
}