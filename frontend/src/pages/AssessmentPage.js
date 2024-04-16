import React from 'react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AssessmentPage.css'; 
import {NavLink} from 'react-router-dom';

const Assessment = () => {
  return (
    <div className="asessmentContainer">
        <h1 className="APassesstext">Assessments</h1>
        <div className="container">
            <div className="HPcircle-container">
                <div className="HPcircle1">
                    <div className="HPinner-circle">PT</div>
                </div>
                <div className="HPcircle2">
                    <div className="HPinner-circle">D</div>
                </div>
                <div className="HPcircle3">
                    <div className="HPinner-circle">FL</div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 text-center">
                    <h3>Personality Type</h3>
                    <p className="HPcircleText">
                    Learn about the inner workings of your mind to harness
                    your strengths and weaknesses and connect with yourself.
                    </p>
                    <NavLink to="/personalitytype"><button class="btn btn-outline-dark">Start</button></NavLink>
                </div>
                <div className="col-md-4 text-center">
                    <h3>DISC</h3>
                    <p className="HPcircleText">
                    Reveal your fears and values to develop a deeper understanding
                    of your interpersonal interactions and dynamics.
                    </p>
                    <NavLink to="/disc"><button class="btn btn-outline-dark">Start</button></NavLink>
                </div>
                <div className="col-md-4 text-center">
                    <h3>Friendship Language</h3>
                    <p className="HPcircleText">
                    Explore your preferences in expressing and receiving care
                    to nurture and strengthen your friendships.
                    </p>
                    <NavLink to="/friendshiplanguage"><button class="btn btn-outline-dark">Start</button></NavLink>
                </div>
            </div>
      </div>
    </div>
  );
};

const AssessmentPage = () => {
  return (
    <>
      <UserHeader />
      <Assessment />
      <Footer />
    </>
  );
};

export default AssessmentPage;
