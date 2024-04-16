import React, { useState } from 'react';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const app_name = "bondbuddies.com/"

function buildPath(route)
{
    if(process.env.NODE_ENV === 'production')
        return "https://" + app_name + route;
    else
        return "http://localhost:3001/" + route;
}


const ResetPage = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setsuccess] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    newPassword: '',
  });

  const validateUsername = (username) => {

      if(!username.trim()){
          return 'Username cannot be blank';
      } 
      else {
          const containsLetter = /[a-zA-Z]/.test(username);
          const isValid = /^[a-zA-Z0-9]+$/.test(username);
          return (isValid && containsLetter) ? '' : 'Username must only contain\nletters and numbers';
      }
  };

  const validateEmail = (email) => {

    if(!email.trim()){
        return 'Email cannot be blank';
    } 
    else {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        return (isValid) ? '' : 'Email format is invalid';
    }
  };

  const validatePassword = (newPassword) => {

      if(!newPassword.trim()){
          return 'Password cannot be blank';
      } 
      else{
          const containsUppercase = /[A-Z]/.test(newPassword);
          const containsNumber = /[0-9]/.test(newPassword);
          const isValidLength = newPassword.length >= 5;
          const isValid = /^[a-zA-Z0-9]+$/.test(newPassword);
          return (isValid && containsUppercase && containsNumber && isValidLength) ? '' : 'Password must contain at least\none uppercase letter, one number,\nand a minimum of 5 characters';
      }
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    const errorMessage = validateUsername(value);
    setErrors({ ...errors, username: errorMessage });
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const errorMessage = validateEmail(value);
    setErrors({ ...errors, email: errorMessage });
  };

  const handleNewPasswordChange = (event) => {
    const value = event.target.value;
    setNewPassword(value);
    const errorMessage = validatePassword(value);
    setErrors({ ...errors, newPassword: errorMessage });
  };

  const handleResetPassword = async event => {

    event.preventDefault();
  
    
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(newPassword);
    const emailError = validateEmail(email);

    setErrors({ ...errors, username: usernameError, newPassword: passwordError });

    if(usernameError || passwordError || emailError){
      return;
    }

    const obj = {
      login: username,
      email: email,
      password: newPassword,
    };

    console.log(obj);

    var payload = JSON.stringify(obj);



    try{
      const response = await fetch(

        buildPath("user/resetPassword"),
        {
          method: "POST",
          body: payload,
          headers: {
            'Content-type': 'application/json'
          }
        });

        var res = JSON.parse(await response.text());

        if(res.error !== ""){
          console.log(res.error);
        }
        else{
          console.log("reset successful");
          setsuccess("Reset successful!");
        }
    }catch(e){
      alert(e.toString());
      return;
    }
    
  };

  return (
    <>
      <AuthHeader />
      <div className="LGlogin-container">
        <div className="LGlogin">
          <form className="login-form" onSubmit={handleResetPassword}>
            <h2 id="loginh2">Reset Password</h2>
            <div id="userfield" className="LGform-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} />
            </div>
            <div className="LGform-group">
              <label htmlFor="pwd">Email</label>
              <input type="text" className="form-control" id="email" value={email} onChange={handleEmailChange} />
              
            </div>
            <div className="LGform-group">
              <label htmlFor="newPwd">New Password</label>
              <input type="password" className="form-control" id="newPwd" value={newPassword} onChange={handleNewPasswordChange} />
            </div>
              <br/>

            <div>
              {errors.username && <span className="error-message">{errors.username}</span>}
              {errors.username && <br />}
              {errors.email && <span className="error-message">{errors.email}</span>}
              {errors.email && <br />}
              {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
              {errors.newPassword && <br />}
              {<span className="error-message">{success}</span>}
              {success && <br />}
            </div>
            <br/>
            <div id="resetbutton" className="d-flex justify-content-center">
              <button id="submitbtn" onClick={handleResetPassword} type="submit" className="btn btn-primary">Reset Password</button>
            </div>
            <br/>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPage;
