import React from 'react';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/footer';
import RegisterForm from '../components/RegisterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/RegisterPage.css'; 

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
