import React from 'react';
import { NavLink } from 'react-router-dom';

const AddPerson = ({ profileSrc, name, buddyType }) => {
  return (
    <div className="person">
      <div className="row">
        <NavLink className="FPpersonContainer" to="/">
          <div id="profileSection" className="col">
            <img alt="user" className="FPprofile" src={profileSrc} />
          </div>
          <div id="textSection" className="col-6">
            <h3 id="FPpersonName">{name}</h3>
            <h5 id="FPbuddyType">{buddyType}</h5>
          </div>
        </NavLink>
        <div id="buttonSection" className="col">
            <button id="add" className="btn btn-dark pull-right">
                <svg id="addicon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                </svg>
            </button>
          <button id="block" className="btn btn-danger pull-right">
                <svg id="blockicon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-ban" viewBox="0 0 16 16">
                    <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
                </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPerson;
