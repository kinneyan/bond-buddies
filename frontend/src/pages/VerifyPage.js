import React, {useState} from 'react';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/VerifyPage.css'; 

const app_name = "bondbuddies.com/"

function buildPath(route)
{
    if(process.env.NODE_ENV === 'production')
        return "https://" + app_name + route;
    else
        return "http://localhost:3001/" + route;
}

const VerifyPage = () => {

  const [failureMessage, setfailureMessage] = useState('');

  var username;
  var pwd;
  var bearer;
  var verification;

  const doLogin = async event => {

      event.preventDefault();
      var obj = {
          username: username.value,
          password: pwd.value
      }

      var payload = JSON.stringify(obj);
      try{

          const response = await fetch(buildPath("user/login"),
          {method: 'POST', body: payload, headers: {'Content-type': 'application/json'}});

          var res = JSON.parse(await response.text());

          console.log(res);

          if(res.error === "Username or password is incorrect."){
            console.log(res.error);
            setfailureMessage("Username or password is incorrect");
          }
          else
          {
              var userInfo = {

                  firstName: res.firstName,
                  lastName: res.lastName,
                  error: res.error,
                  bearer: res.bearer,
                  verified: res.verified,
              }

              bearer = userInfo.bearer;
              verification = userInfo.verified;

              //console.log("bearer: " + bearer);
              console.log("verification: " + verification);
              
              const test = await verifyUser();

              console.log("test: " + test);

              //console.log(userInfo.verified);
              
              if(test){
                setfailureMessage("Thank you for verifying your account!\nPlease close this window.");
                //navigation.navigate('UserHome', { bearerToken: res.bearer });
              }
              else{
                setfailureMessage("Username or password is incorrect");
              }
            
          }
      }
      catch(e)
      {
          alert(e.toString());
          return;
      }
  }

  const verifyUser = async () => {
    console.log(bearer);
  
    try {
      if (bearer) {
        const response = await fetch('http://localhost:3001/user/verifyUser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${bearer}`
          },
        });
  
        if (response.ok) {
          console.log("Verification successful.");
          return true;
        } else {
          console.error("Verification failed: ", response.error);
          return false;
        }
      } else {
        console.error("Bearer token not found.");
        return false;
      }
    } catch (error) {
      console.error("Error fetching user info: ", error);
      return false;
    }
  };
  

  return(
    <>
      <AuthHeader />
        <div className="LGlogin-container">
          <div className="LGlogin">
            <form className="login-form">
              <h2 id="loginh2">Verify Your Account</h2>
              <div id="userfield" className="LGform-group">
                <label htmlFor="username">Username</label>
                <input ref={(c) => username = c} type="username" className="form-control" id="username"/>
              </div>
              <div className="LGform-group">
                <label htmlFor="pwd">Password</label>
                <input ref={(c) => pwd = c} type="password" className="form-control" id="pwd"/>
              </div>

              {failureMessage && <br />}
              {failureMessage && <span className="error-message">{failureMessage}</span>}
              {failureMessage && <br />}

              <br/>
              <div className="d-flex justify-content-center">
                <button id="submitbtn" type="submit" className="btn btn-primary" onClick={doLogin}>Verify</button>
              </div>
            </form>
          </div>
      </div>
      <Footer />
    </>
)
};

export default VerifyPage;