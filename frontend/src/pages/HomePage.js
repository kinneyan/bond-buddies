import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/HomePage.css'; 
import logo from '../images/logowhite.PNG';
import Footer from '../components/footer';

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar navbar-dark bg-transparent">
        <div className="navbar-logo">
          <a href="index.html"><img src={logo} alt="Logo"/></a>
        </div>
        <div className="navbar-login">
          <a href="login.html" className="btn btn-light">Login/Register</a>
        </div>
      </nav>
    </div>
  );
};

const Title = () => {
  return (
    <div className="title">
      <h1 className="compname">BOND BUDDIES</h1>
      <h3 className="slogan">friendship starts here</h3>
    </div>
  );
};

const Assessments = () => {
  return (
    <div className="assessments">
      <h1 className="assesstext">ASSESSMENTS</h1>
      <div className="container">
        <div className="circle-container">
          <div className="circle1">
            <div className="inner-circle">PT</div>
          </div>
          <div className="circle2">
            <div className="inner-circle">D</div>
          </div>
          <div className="circle3">
            <div className="inner-circle">FL</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 text-center">
            <h3>Personality Type</h3>
            <p className="circleText">
              Learn about the inner workings of your mind to harness
              your strengths and weaknesses and connect with yourself.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <h3>DISC</h3>
            <p className="circleText">
              Reveal your behavioral style to develop a deeper understanding
              of your interpersonal interactions and dynamics.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <h3>Friendship Language</h3>
            <p className="circleText">
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
    <div className="moreinfo">
      <div className="left">
        <h1>MORE <br /> ABOUT <br /> US</h1>
      </div>
      <div className="right">
        <p className="moreText">
          Introducing Bond Buddies, a revolutionary way to make friends. With Bond Buddies, you can connect with like-minded individuals who share your interests, values, and personality traits. Whether you're looking for a workout buddy, a hiking companion, or someone to binge-watch your favorite TV show with, Bond Buddies has you covered.
        </p>
        <p className="moreText">
          After signing up, you can take comprehensive personality tests that evaluate your preferences, strengths, and communication style. These tests ensure that potential friends are compatible with your personality, making it easier to form meaningful connections.
        </p>
        <p className="moreText">
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
