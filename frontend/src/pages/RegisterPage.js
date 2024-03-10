import React from 'react';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/RegisterPage.css'; 
import { NavLink } from 'react-router-dom';

const RegisterForm = () => {
  return (
    <div className="RPregister-container">

        <div className="RPregister">
            <form className="register1-form">
                <h2 id="registerh2" >Register</h2>
                <div className="row">
                    <div className="col">
                        <div id="firstName" className="form-group">
                            <label for="firstName">First Name</label>
                            <input type="firstName" className="form-control" id="firstName"/>
                        </div>
                    </div>
                    <div className="col">
                        <div id="lastName" className="form-group">
                            <label for="lastName">Last Name</label>
                            <input type="lastName" className="form-control" id="lastName"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div id="email" className="form-group">
                            <label for="email">Email</label>
                            <input type="email" className="form-control" id="email"/>
                        </div>
                    </div>
                    <div className="col">
                        <div id="username" className="form-group">
                            <label for="username">Username</label>
                            <input type="username" className="form-control" id="username"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div  id="password" className="form-group">
                            <label for="password">Password</label>
                            <input type="password" className="form-control" id="password"/>
                        </div>
                    </div>
                    <div className="col">
                        <div  id="confirmPassword" className="form-group">
                            <label for="confirmPassword">Confirm Password</label>
                            <input type="confirmPassword" className="form-control" id="confirmPassword"/>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <button id="registerbtn" className="btn btn-primary">Register</button>
                </div>
                <div className="RPholder">
                    <NavLink id="accountbtn" to="/login">Have an account?</NavLink>
                </div>
            </form>
        </div>
    </div>
  );
};

const RegisterPage = () => {
  return (
    <>
      <AuthHeader />
      <RegisterForm />
      <Footer />
    </>
  );
};

export default RegisterPage;
