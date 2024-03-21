import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/HomePage.css'; 
import logo from '../images/logowhite.PNG';
import Footer from '../components/footer';
import {NavLink} from 'react-router-dom';

const Header = () => {
  return (
    <div className="HPheader">
      <nav className="HPnavbar navbar-dark bg-transparent">
        <div className="HPnavbar-logo">
          <NavLink to="/"><img id="HPlogo" src={logo} alt="Logo"/></NavLink>
        </div>
        <div className="navbar-login">
          <NavLink to='/login' id="HPloginbutton" className="btn btn-light">Login</NavLink>
          <NavLink to='/register' id="HPregisterbutton" className="btn btn-light">Register</NavLink>
        </div>
      </nav>
    </div>
  );
};

const Title = () => {
  return (
    <div className="HPtitle">
      <h1 className="HPcompname">BOND BUDDIES</h1>
      <h3 className="HPslogan">friendship starts here</h3>
    </div>
  );
};

const Assessments = () => {
  return (
    <div className="HPassessments">
      <h1 className="HPassesstext">ASSESSMENTS</h1>
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
          </div>
          <div className="col-md-4 text-center">
            <h3>DISC</h3>
            <p className="HPcircleText">
              Reveal your behavioral style to develop a deeper understanding
              of your interpersonal interactions and dynamics.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <h3>Friendship Language</h3>
            <p className="HPcircleText">
              Explore your preferences in expressing and receiving care
              to nurture and strengthen your friendships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MoreInfo = () => {
  return (
    <div className="HPmoreinfo">
      <div className="HPleft">
        <h1 id="leftTitle">MORE <br /> ABOUT <br /> US</h1>
      </div>
      <div className="HPright">
        <p className="HPmoreText">
          Introducing Bond Buddies, a revolutionary way to make friends. With Bond Buddies, you can connect with like-minded individuals who share your interests, values, and personality traits. Whether you're looking for a workout buddy, a hiking companion, or someone to binge-watch your favorite TV show with, Bond Buddies has you covered.
        </p>
        <p className="HPmoreText">
          After signing up, you can take comprehensive personality tests that evaluate your preferences, strengths, and communication style. These tests ensure that potential friends are compatible with your personality, making it easier to form meaningful connections.
        </p>
        <p className="HPmoreText">
          Once you've completed your tests, you can read about your interests and personality traits on your page. If you want to compare with others, simply view their profile, see your compatibility, and read their results. If you would like to further your connection, add them and start a conversation!
        </p>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <Header />
      <Title />
      <Assessments />
      <MoreInfo />
      <Footer />
    </>
  );
};

export default HomePage;
