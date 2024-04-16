import React from 'react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/footer';
import Settings from '../components/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SettingsPage.css'; 


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
