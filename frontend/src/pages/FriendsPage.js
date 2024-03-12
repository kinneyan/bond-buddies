import React from 'react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/FriendsPage.css'; 
import searchicon from '../images/mag.png';
import prof from '../images/prof.png';
import { NavLink } from 'react-router-dom';

const Search = () => {
  return (
    <div className="search-section"> 
      <div id="searchDiv">
          <div className="search-box">
              <div className="row-search">
                  <input type="text" id="input-box" placeholder="Search"  name="input-box" autocomplete="off"/>
                  <button type="button" id="searchb" className="img-b"><img className="searchimg" src={searchicon} alt=""/></button>
              </div>
          </div>
      </div>
    </div>
  );
};

const Friends = () => {

  const toggleText = (e) => {
    const parent = e.currentTarget.parentNode;
    const siblings = parent.children;
    for (let i = 0; i < siblings.length; i++) {
      siblings[i].classList.remove('toggleText');
    }
    e.currentTarget.classList.add('toggleText');
  };

  return (

    <div class="friend-container">
      <div class="whitecontainer">
          <div class="myfriends" onClick={toggleText}>
              <h2 className="friendTitle">My Friends</h2>
          </div>
          <div class="addfriends" onClick={toggleText}>
              <h2 className="friendTitle">Add Friends</h2>
          </div>
          
          <div class="people">
              <div class="person">
                  <div class="row">
                      <div class="col-md-2 col-sm-2">
                        <img src={prof} alt="user" class="profile-photo-lg"/>
                      </div>
                      <div class="col-md-7 col-sm-7">
                        <NavLink id="personName" to="/">Test Person</NavLink>
                      </div>
                      <div class="col-md-3 col-sm-3">
                        <button id="remove" class="btn btn-dark pull-right">
                        <svg id="removeicon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-dash-fill" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
                          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg>
                        </button>
                        <button id="block" class="btn btn-danger pull-right">
                        <svg id="blockicon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-ban" viewBox="0 0 16 16">
                          <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
                        </svg>
                        </button>
                      </div>
                    </div>
              </div>
          </div>
      </div>
    </div>
  );
};



const FriendsPage = () => {
  return (
    <>
      <UserHeader />
      <Search />
      <Friends />
      <Footer />
    </>
  );
};

export default FriendsPage;
