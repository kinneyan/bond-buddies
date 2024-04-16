import React, { useState } from 'react';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/footer';
import Login from '../components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/LoginPage.css'; 


const LoginPage = () => {

  return (
    <>
      <AuthHeader />
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;
