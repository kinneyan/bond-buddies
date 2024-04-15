import React from 'react';
import logo from '../images/logoblack.PNG';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div>
        <nav className="navbar navbar-light bg-white">
            <div className="navbar-logo">
            <NavLink to="/"><img src={logo} alt="Logo"/></NavLink>
            </div>
            <div className="navbar-login">
                <h3>BOND BUDDIES</h3>
            </div>
        </nav>
    </div>
  );
};

export default Header;