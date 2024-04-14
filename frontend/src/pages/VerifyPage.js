import React from 'react';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/VerifyPage.css'; 
import { NavLink } from 'react-router-dom';

const VerifyPage = () => {

  return (
    <>
      <AuthHeader />
      <div className="LGlogin-container">
          <div className="LGlogin">
            <form className="login-form">
              <h2 id="loginh2">Verification</h2>
                <p>Thank you for verifying your account!</p>
              <div className="d-flex justify-content-center">
              <NavLink id="verifylink" to="/login">
                <button id="submitbtn" type="submit" className="btn btn-primary">Go to Login</button>
              </NavLink>
              </div>
            </form>
          </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyPage;
