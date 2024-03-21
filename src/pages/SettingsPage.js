import React from 'react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SettingsPage.css'; 

const Settings = () => {
  return (
        <div className="editinfo-container">
            <div className="editinfo">
                <form className="editinfo-form">
                    <h2 id="editTitle">Edit Information</h2>
                    <div className="row">
                        <div className="col">
                            <div id="firstName" className="SPform-group">
                                <label for="firstName">First Name</label>
                                <input type="firstName" className="form-control" id="firstName"/>
                            </div>
                        </div>
                        <div className="col">
                            <div id="lastName" className="SPform-group">
                                <label for="lastName">Last Name</label>
                                <input type="lastName" className="form-control" id="lastName"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div id="email" className="SPform-group">
                                <label for="email">Email</label>
                                <input type="email" className="form-control" id="email"/>
                            </div>
                        </div>
                        <div className="col">
                            <div id="username" className="SPform-group">
                                <label for="username">Username</label>
                                <input type="username" className="form-control" id="username"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="SPform-group">
                                <label for="password">Password</label>
                                <input type="password" className="form-control" id="password"/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="SPform-group">
                                <label for="confirmPassword">Confirm Password</label>
                                <input type="confirmPassword" className="form-control" id="confirmPassword"/>
                            </div>
                        </div>
                    </div>
    
                    <div className="d-flex justify-content-center">
                        <button id="savebtn" className="btn btn-dark">Save</button>
                    </div>
                </form>
            </div>
        </div>
  );
};

const AssessmentPage = () => {
  return (
    <>
      <UserHeader />
      <Settings />
      <Footer />
    </>
  );
};

export default AssessmentPage;
