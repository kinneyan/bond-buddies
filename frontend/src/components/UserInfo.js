import React, { useEffect, useState } from 'react';
import aero from '../images/aero.png';
import terra from '../images/terra.png';
import pyro from '../images/pyro.png';
import aqua from '../images/aqua.png';
import prof from '../images/prof.png';
import unknown from '../images/unknown.png'

const app_name = "bondbuddies.com/"
function buildPath(route)
{
    if(process.env.NODE_ENV === 'production')
        return "https://" + app_name + route;
    else
        return "http://localhost:3001/" + route;
}

function UserInfo()
{
    var perType;
    var buddyType;
    var discType;
    var friendType;
const getTestResults = async event =>
{
    try
    {
        const response = await fetch(buildPath("assessments/results"),
        {method: 'GET', headers:{'Content-type': 'application/json', 
        'Authorization': sessionStorage.getItem('bearer')}})
        var res = JSON.parse(await response.text());
        if (res.error === "Could not get assessment results." ||
            res.error === "No assessment results found.")
            console.log(res.error)
        else
        {
            console.log(res)
                if(res.buddyType)
                {
                    buddyType = res.buddyType
                    sessionStorage.setItem("buddyType", buddyType)
                }
                if(res.personality) perType = res.personality.type
                if(res.disc) discType = res.disc.type
                if(res.friendship) friendType = res.friendship.type
                if(buddyType === "Terra")
                    document.getElementById("descrip").innerHTML = "Like the solid ground beneath your feet, you offer unwavering support ana dstability no matter the challenge."
                else if(buddyType === "Aero")
                    document.getElementById("descrip").innerHTML = "Bringing a breath of fresh air with your wit and curiosity, your offer intellect and encourage others to broaden their horizons."
                else if(buddyType === "Pyro")
                    document.getElementById("descrip").innerHTML = "Like a blazing fire, you radiate warmth and vitality, infusing others with an infectious energy that lights up their soul."
                else if(buddyType === "Aqua")
                    document.getElementById("descrip").innerHTML = "Flowing through life with grace and compassion, you soothe souls with your unconditional understanding and support"
                if(buddyType) {document.getElementById("type").innerHTML = buddyType}
                if(perType) {document.getElementById("myersResult").innerHTML = perType}
                if(discType) {document.getElementById("discResult").innerHTML = discType}
                if(friendType) {document.getElementById("friendResult").innerHTML = friendType}
                document.getElementById("buddyImg").src=(sessionStorage.getItem("buddyType") === "Aero") ? aero 
                                                        : (sessionStorage.getItem("buddyType") === "Terra") ? terra 
                                                        : (sessionStorage.getItem("buddyType") === "Pyro") ? pyro 
                                                        : (sessionStorage.getItem("buddyType") === "Aqua") ? aqua 
                                                        : unknown
        }
    }
    catch(e)
    {
        alert(e.toString());
        return;
    }
}

useEffect(() => {
    let ignore = false;
    
    if (!ignore)  
    getTestResults()
    return () => { ignore = true; }
},[]);

    return (
          <div className="userinfo">
          <div className="content">
              <div className="left-content">
                  <h3 id="hello">Hello, {sessionStorage.getItem("firstName").charAt(0).toUpperCase() + sessionStorage.getItem("firstName").slice(1)}</h3>
                  <img id="buddyImg" src={unknown} className="rounded-circle" style={{border: '3px solid black', position: 'relative', bottom: '10px', left: '1vh', width: '88px', height: '88px' }} />
                  <h2 id="type">Unknown</h2>
                  <p id="descrip">Piquing curiosity with your mysterious allure, you draw others (and our algorithm) to unravel the enigma of your essence</p>
              </div>
              <div className="right-content">
                  <table className="rounded-table">
                      <tbody>
                          <tr>
                              <td className="assessment">Personality Test</td>
                              <td id="myersResult" className="result">No data</td>
                          </tr>
                          <tr>
                              <td className="assessment">DISC</td>
                              <td id="discResult" className="result">No data</td>
                          </tr>
                          <tr>
                              <td className="assessment">Friendship Langauge</td>
                              <td id="friendResult" className="result">No data</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    );
}
  export default UserInfo;