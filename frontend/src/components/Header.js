import React from 'react';
import logo from '../images/logoblack.PNG';

const Header = () => {
  return (
    <div class="header">
        <nav class="navbar navbar-light bg-white">
            <div class="navbar-logo">
                <a href="index.html"><img src={logo} alt="Logo"/></a>
            </div>
            <div class="navbar-login">
                <h3>BOND BUDDIES</h3>
            </div>
        </nav>
    </div>
  );
};

export default Header;