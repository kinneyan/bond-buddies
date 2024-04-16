import React, { useState, useEffect } from 'react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/FriendsPage.css'; 
import searchicon from '../images/mag.png';
import prof from '../images/aqua.png';
import { NavLink } from 'react-router-dom';
import FriendPerson from '../components/FriendPerson';
import AddPerson from '../components/AddPerson';
import RegisterForm from '../components/RegisterForm';

const app_name = "bondbuddies.com/"
function buildPath(route)
{
    if(process.env.NODE_ENV === 'production')
        return "http://" + app_name + route;
    else
        return "http://localhost:3001/" + route;
}

var search

const  getSearchResults = async event =>
{
  var obj = {
    search: search.value
  }
  var payload = JSON.stringify(obj)
  try
  {
    const response = await fetch(buildPath("friends/search"),
    {method: 'POST', body: payload, headers:{'Content-type': 'application/json',
    'Authorization': sessionStorage.getItem('bearer')}})
    var res = JSON.parse(await response.text())
    if(res.error === "")
    {
        var create = ''
        console.log(res.friends)
        for (var i in res.friends)
        {
          console.log(res.friends[i].firstName)
          create += <FriendPerson profileSrc={prof} name={res.friends[i].firstName}  buddyType="Buddy type" />
          console.log(create)
        }
        document.getElementById("friendList").innerHTML = create
          
    }
  }
  catch(e)
  {
    alert(e.toString())
    return;
  }
}

const Search = () => {
  return (
    <div className="search-section"> 
      <div id="searchDiv">
          <div className="search-box">
              <div className="row-search">
                  <input ref={(c) => search = c} onKeyUp={getSearchResults}type="text" id="input-box" placeholder="Search"  name="input-box" autoComplete="off"/>
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
            <div id="friendList">
              <FriendPerson profileSrc={prof} name="Temp"  buddyType="Buddy type" />
              <FriendPerson profileSrc={prof} name="Temp"  buddyType="Buddy type" />
              <FriendPerson profileSrc={prof} name="Temp"  buddyType="Buddy type" />
              
            </div>
          ) : (

            <AddPerson profileSrc={prof} name="Add Friend" buddyType="Buddy type" />
          )}
        </div>
        <div className="buttoncontainer">
        <button id="prevButton" className="btn btn-dark" disabled>Previous</button>
        <button id="nextButton" className="btn btn-dark">Next</button>
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
