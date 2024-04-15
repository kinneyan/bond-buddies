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

function Login()
{
    var username;
    var pwd;
    var bearer;

    const getInfo = async event =>
      {
        console.log(bearer)
        try
      {
      const response = await fetch(buildPath("user/self"),
      {method: 'GET', headers:{'Content-type': 'application/json', 'Authorization': bearer}});
      var res = JSON.parse(await response.text());
      if (res.error === "Could not authenticate request." || res.error === "Could not get user information from server.")
        console.log(res.error)
      else
      {
        sessionStorage.setItem("firstName", res.firstName)
        sessionStorage.setItem("lastName", res.lastName)
        sessionStorage.setItem("email", res.email)
        sessionStorage.setItem("bearer", bearer)
        sessionStorage.setItem("login", res.login)
        window.location.href = '/user';
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
        var obj = {
            username: username.value,
            password: pwd.value
        }
        var payload = JSON.stringify(obj);
        try
        {
            const response = await fetch(buildPath("user/login"),
            {method: 'POST', body: payload, headers: {'Content-type': 'application/json'}});
            var res = JSON.parse(await response.text());

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
                    bearer: res.bearer
                }
                bearer = userInfo.bearer
                getInfo();
            }
            
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }

    const [showLogin, setShowLogin] = useState(true);
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotPasswordSuccessMessage, setForgotPasswordSuccessMessage] = useState('');
    const [failureMessage, setfailureMessage] = useState('');

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

    const handleSendResetPasswordEmail = () => {
        console.log(`Reset password email sent to: ${forgotEmail}`);
        setForgotPasswordSuccessMessage(`Password reset email sent to: ${forgotEmail}`);
    };

    return(
        <div className="LGlogin-container">
        {showLogin && (
          <div className="LGlogin">
            <form className="login-form">
              <h2 id="loginh2">Login</h2>
              <div id="userfield" className="LGform-group">
                <label htmlFor="username">Username</label>
                <input ref={(c) => username = c} type="username" className="form-control" id="username"/>
              </div>
              <div className="LGform-group">
                <label htmlFor="pwd">Password</label>
                <input ref={(c) => pwd = c} type="password" className="form-control" id="pwd"/>
              </div>
              <div className="forgotpass">
                <button onClick={handleForgotClick} id='forgot-btn' className="btn-member btn-fade">Forgot Password?</button>
              </div>

              {failureMessage && <span className="error-message">{failureMessage}</span>}
              {failureMessage && <br />}
              <br/>
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

              <p id="forgotPasswordSuccessMessage">{forgotPasswordSuccessMessage}</p>

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