import React from 'react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/footer';
import AssessmentInfo from '../components/AssessmentInfo';
import UserInfo from '../components/UserInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/UserPage.css'; 

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserInfo />
      <AssessmentInfo />
      <Footer />
    </>
  );
};

export default UserPage;
