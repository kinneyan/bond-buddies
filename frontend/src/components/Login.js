import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

const app_name = "bondbuddies.com/"
function buildPath(route)
{
    if(process.env.NODE_ENV === 'production')
        return "http://" + app_name + route;
    else
        return "http://localhost:3001/" + route;
}

function Login(){

    var firstName;
    var lastName;
    var email;
    var login;
    var bearer;

    const [errorMessage, setErrorMessage] = useState('');

    const getInfo = async event => {

        console.log(bearer)
          
        try{

          const response = await fetch(buildPath("user/verify"),
          {
            method: 'GET', 
            headers:{
              'Content-type': 'application/json', 
              'Authorization': bearer}
          });

          var res = JSON.parse(await response.text());

          console.log(res);

          if(res.error === "Could not authenticate request." || res.error === "Could not get user information from server."){
            console.log(res.error)
          }
          else{

            console.log("firstName: " + firstName)
            console.log("lastName: " + lastName)

            sessionStorage.setItem("firstName", firstName);
            sessionStorage.setItem("lastName", lastName);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("bearer", bearer);
            sessionStorage.setItem("login", res.login);

            if(sessionStorage.getItem("verified") === "true"){
              sessionStorage.setItem("verified", true)
              window.location.href = '/user';
            }
            else{
              setErrorMessage("Please verify your account");
            }
          }
    }
    catch(e)
      {
      alert(e.toString());
      return;
      }
    }
      
    const doLogin = async event =>
    {
        event.preventDefault();
        sessionStorage.clear();

        console.log("username: " + loginusername);
        console.log("email: " + loginpassword);
        
        var obj = {

            username: loginusername,
            password: loginpassword
        }

        var payload = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath("user/login"),
            {
              method: 'POST', 
              body: payload, 
              headers: {
                'Content-type': 'application/json'}
              });

            var res = JSON.parse(await response.text());

            if(res.error === "Username or password is incorrect."){
              console.log(res.error);
              setErrorMessage("Username or password is incorrect");
              setForgotPasswordSuccessMessage('');
            }
            else
            {
              console.log("Login successful!");

                var userInfo = {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    error: res.error,
                    bearer: res.bearer
                }

                firstName = userInfo.firstName;
                lastName = userInfo.lastName;
                bearer = userInfo.bearer;

                sessionStorage.setItem("verified", res.verified);
                getInfo();
                setErrorMessage('');
              
            }
            
        }
        catch(e)
        {
            setForgotPasswordSuccessMessage('');
            alert(e.toString());
            return;
        }
    }

    const [showLogin, setShowLogin] = useState(true);
    const [showForgot, setShowForgot] = useState(false);
    const [loginusername, setloginUsername] = useState('');
    const [loginpassword, setloginPassword] = useState('');
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotUsername, setForgotUsername] = useState('');
    const [forgotPasswordSuccessMessage, setForgotPasswordSuccessMessage] = useState('');
    const [forgotPasswordErrorMessage, setForgotPasswordErrorMessage] = useState('');

    const handleForgotClick = () => {
        setShowLogin(false);
        setShowForgot(true);
    };

    const handleLoginClick = () => {
        setShowForgot(false);
        setShowLogin(true);
        setForgotEmail('');
        setForgotPasswordSuccessMessage('');
    };  

    const handleSendResetPasswordEmail = async () => {

      try{

        console.log("username: " + forgotUsername);
        console.log("email: " + forgotEmail);

        const response = await fetch(buildPath("user/forgotPassword"), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: forgotUsername,
                email: forgotEmail,
            }),
        });

        //console.log(response);

        if(response.ok) {
          console.log(`Reset password email sent to: ${forgotEmail}`);
          setForgotPasswordSuccessMessage(`Password reset email sent to: ${forgotEmail}`);
          setForgotPasswordErrorMessage('');
        } else {
            console.error("Forgot password email failed: ", response.error);
            setForgotPasswordErrorMessage("Password reset email failed to send");
            setForgotPasswordSuccessMessage('');
        }

      }catch (error) {
          console.error("Error during forgot password email: ", error);
          setForgotPasswordErrorMessage("Password reset email failed to send");
          setForgotPasswordSuccessMessage('');
      };
    };

    return(
        <div className="LGlogin-container">
        {showLogin && (
          <div className="LGlogin">
            <form className="login-form">
              <h2 id="loginh2">Login</h2>
              <div id="userfield" className="LGform-group">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  className="form-control"
                  id="username"
                  value={loginusername}
                  onChange={(e) => setloginUsername(e.target.value)}
                />
              </div>
              <div className="LGform-group">
                <label htmlFor="pwd">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  value={loginpassword}
                  onChange={(e) => setloginPassword(e.target.value)}
                />
              </div>
              <div className="forgotpass">
                <button onClick={handleForgotClick} id='forgot-btn' className="btn-member btn-fade">Forgot Password?</button>
              </div>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              {errorMessage && (<br />)}

              <div className="d-flex justify-content-center">
                <button id="submitbtn" type="submit" className="btn btn-primary" onClick={doLogin}>Log In</button>
              </div>
              <div className="LGholder">
                <NavLink id="needaccount" to="/register">Need an account?</NavLink>
              </div>
            </form>
          </div>
        )}

        {showForgot && (
          <div className="LGforgot">
            <form id="forgotPassword" className="forgot-form">
              <h2 id="registerh2">Forgot Password</h2>

              <div className="form-group">
                <label htmlFor="forgotEmailInput">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="forgotEmailUsername"
                  value={forgotUsername}
                  onChange={(e) => setForgotUsername(e.target.value)}
                />
                <br />
                <label htmlFor="forgotEmailInput">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="forgotEmailInput"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-center">
                <button
                  id="sendResetPasswordEmailBtn"
                  onClick={handleSendResetPasswordEmail}
                  type="button"
                  className="btn btn-primary"
                >
                  Reset Password
                </button>
              </div>

              {forgotPasswordSuccessMessage && (
                  <p id="forgotPasswordSuccessMessage">{forgotPasswordSuccessMessage}</p>
              )}
              {forgotPasswordErrorMessage && (
                  <br />)}

              {forgotPasswordErrorMessage && (
                  <p id="forgotPasswordErrorMessage">{forgotPasswordErrorMessage}</p>
              )}

              <div className="HPback">
                <button id="backbtn" onClick={handleLoginClick} className="btn-login btn-fade">Back to Login</button>
              </div>
            </form>
          </div>
        )}
      </div>
    )
}

export default Login;