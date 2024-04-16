import React from 'react';
import logo from '../images/logoblack.PNG';
import profile from '../images/prof.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div>
        <nav id="pageNavbar" className="navbar navbar-expand-lg navbar-white bg-white">
            <div className="UHnavbar-logo">
                <NavLink to="/"><img id="logo" src={logo} alt="Logo"/></NavLink>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">
                </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul id="links" className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink id="link1" className="nav-link" to="/user">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink id="link2" className="nav-link" to="/assessments">Assessments</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink id="link3" className="nav-link" to="/friends">Friends</NavLink>
                    </li>
                    {/*
                    <li className="nav-item">
                        <NavLink id="link4" className="nav-link" to="/messages">Messages</NavLink>
                    </li>
                    */}
                </ul>
                <ul className="navbar-nav">
                    <ProfileDropdown />
                </ul>
            </div>
        </nav>
    </div>
  );
};

const NotificationDropdown = () => {
    return (
        <li id="notfdrop" className="nav-item dropdown">
            <button className="nav-link dropdown-toggle" id="notificationDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-bell-fill" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                </svg>
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="notificationDropdown">
            <p id="notif" className="dropdown-item">Notification 1</p>
            <div className="dropdown-divider"></div>
            <p id="notif" className="dropdown-item">Notification 1</p>
            </div>
        </li>
    );
};

const ProfileDropdown = () => {
    return (
        <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle" id="profileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={profile} alt="Profile" className="rounded-circle" style={{ width: '32px', height: '32px' }} />
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
                <NavLink to="/settings" className="dropdown-item">Settings</NavLink>
                <div className="dropdown-divider"></div>
                <NavLink to="/" className="dropdown-item">Logout</NavLink>
            </div>
        </li>
    );
};

export default Header;
