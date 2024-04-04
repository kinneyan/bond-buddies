import React, { useState } from 'react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/FriendsPage.css'; 
import searchicon from '../images/mag.png';
import prof from '../images/aqua.png';
import { NavLink } from 'react-router-dom';
import FriendPerson from '../components/FriendPerson';
import AddPerson from '../components/AddPerson';

const Search = () => {
  return (
    <div className="search-section"> 
      <div id="searchDiv">
          <div className="search-box">
              <div className="row-search">
                  <input type="text" id="input-box" placeholder="Search"  name="input-box" autoComplete="off"/>
                  <button type="button" id="searchb" className="img-b"><img className="searchimg" src={searchicon} alt=""/></button>
              </div>
          </div>
      </div>
    </div>
  );
};

const Friends = () => {

  const [activeTab, setActiveTab] = useState('My Friends');

  const toggleText = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="friend-container">
      <div className="whitecontainer">
        <div className={activeTab === 'My Friends' ? 'myfriends toggleText' : 'myfriends'}
          onClick={() => toggleText('My Friends')}>
          <h2 className="friendTitle">My Friends</h2>
        </div>
        <div className={activeTab === 'Add Friends' ? 'addfriends toggleText' : 'addfriends'}
          onClick={() => toggleText('Add Friends')}>
          <h2 className="friendTitle">Add Friends</h2>
        </div>
        
        <div className="people">

          {activeTab === 'My Friends' ? (

            <FriendPerson profileSrc={prof} name="My Friend" buddyType="Buddy type" />
          ) : (

            <AddPerson profileSrc={prof} name="Add Friend" buddyType="Buddy type" />
          )}
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
