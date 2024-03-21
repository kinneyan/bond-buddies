import React, { useState } from 'react';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/LoginPage.css'; 
import { NavLink } from 'react-router-dom';

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotPasswordSuccessMessage, setForgotPasswordSuccessMessage] = useState('');

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

  return (
    <>
      <AuthHeader />
      <div className="LGlogin-container">
        {showLogin && (
          <div className="LGlogin">
            <form className="login-form">
              <h2 id="loginh2">Login</h2>
              <div id="userfield" className="LGform-group">
                <label htmlFor="username">Username</label>
                <input type="username" className="form-control" id="username"/>
              </div>
              <div className="LGform-group">
                <label htmlFor="pwd">Password</label>
                <input type="password" className="form-control" id="pwd"/>
              </div>
              <div className="forgotpass">
                <button onClick={handleForgotClick} id='forgot-btn' className="btn-member btn-fade">Forgot Password?</button>
              </div>
              <div className="d-flex justify-content-center">
                <button id="submitbtn" type="submit" className="btn btn-primary">Log In</button>
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
                  Send Reset Password Email
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
      <Footer />
    </>
  );
};

export default LoginPage;
