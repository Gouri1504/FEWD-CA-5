import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
export default function Navbar() {
  const location = useLocation();

  return (
    <>
      <div id='top'>
        <div className='navbar-logo'>
          <Link to='/'>
             <img src="https://kalvium.community/images/sidebar-3d-logo.svg" alt="logo" />
          </Link>
        </div>
        <div className='register'>
         <Link to="/registration" className='active-link'>
            REGISTER
          </Link>
        </div>
      </div>
    </>
  );
}