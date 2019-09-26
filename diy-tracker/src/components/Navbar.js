import React from 'react';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const Navbar = () => {

  const accessProfile = e => {
  axiosWithAuth()
      .get('/users/getusername') 
        .then(response => {
          window.location =(`/users/${response.data.userid}`);
        })
      }

    return (

    <div className="navBar">
      <Link className="styledLink" to="/login">Login</Link>
      <Link className="styledLink" to="/signup">Sign Up</Link>
      <Link className="styledLink" to="/">All Projects</Link>
      <Link className="styledLink" onClick= { () => accessProfile()}>Profile</Link>  
    </div>

    )
}