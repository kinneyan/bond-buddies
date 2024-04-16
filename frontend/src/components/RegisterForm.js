import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const app_name = "bondbuddies.com/"
function buildPath(route)
{
    if(process.env.NODE_ENV === 'production')
        return "http://" + app_name + route;
    else
        return "http://localhost:3001/" + route;
}


function RegisterForm()
{
    var username;
    var password;
    var confirmPassword;
    var firstName;
    var lastName;
    var email;
    var bearer;

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const sendEmail = async event =>
    {
        try
        {
            const response = await fetch(buildPath("user/verify"),
            {method: 'GET', headers:{'Content-type': 'application/json', 'Authorization': bearer}});
            var res = JSON.parse(await response.text());
            if (res.error === "")
            {
                window.location.href = '/login'
            }
            
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }

    const doRegister = async event => {

        event.preventDefault();
        var obj = {
            username: username.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value
        }
        console.log(obj);
        var payload = JSON.stringify(obj);
        try
        {
            const response = await fetch(buildPath("user/register"),
            {
                method: 'POST', 
                body: payload, 
                headers: {
                    'Content-type': 'application/json'
                }
            });

            var res = JSON.parse(await response.text());

            if (res.error !== ""){
                console.log("ain't work!")
                setErrorMessage("Registration failed");
            }
            else
            {
                var result = {
                    error: res.error,
                    bearer: res.bearer
                }

                bearer = result.bearer
                console.log("register!");
                console.log(result);
                sendEmail();
                setErrorMessage('');
                setRegistrationSuccess(true);
                setMessage("Registration successful");
            }
            
        }
        catch(e){
            alert(e.toString());
            return;
        }
    }

    const inactives = event =>
    {
        document.getElementById("require1").classList.add("inactive")
        document.getElementById("require2").classList.add("inactive")
        document.getElementById("require3").classList.add("inactive")
        document.getElementById("require4").classList.add("inactive")
        document.getElementById("require5").classList.add("inactive")
    }

    const fields = event =>
    {
        document.getElementById("require1").classList.remove("inactive")
        document.getElementById("require2").classList.remove("inactive")
        document.getElementById("require3").classList.remove("inactive")
        document.getElementById("require4").classList.remove("inactive")
        document.getElementById("require5").classList.remove("inactive")
        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var nums = /[0-9]/g;
        var pwd = document.getElementById("password");
        var pwdConfirm = document.getElementById("confirmPassword")
        if (pwd.value.length >= 8)
        {
            document.getElementById("require1").classList.remove("invalid");
            document.getElementById("require1").classList.add("valid");
        }
        else
        {
            document.getElementById("require1").classList.remove("valid");
            document.getElementById("require1").classList.add("invalid");
        }

        if (pwd.value.match(lowerCase))
        {
            document.getElementById("require2").classList.remove("invalid");
            document.getElementById("require2").classList.add("valid");
        }
        else
        {
            document.getElementById("require2").classList.remove("valid");
            document.getElementById("require2").classList.add("invalid");
        }
        
        if (pwd.value.match(upperCase))
        {
            document.getElementById("require3").classList.remove("invalid");
            document.getElementById("require3").classList.add("valid");
        }
        else
        {
            document.getElementById("require3").classList.remove("valid");
            document.getElementById("require3").classList.add("invalid");
        }

        if (pwd.value.match(nums))
        {
            document.getElementById("require4").classList.remove("invalid");
            document.getElementById("require4").classList.add("valid");
        }
        else
        {
            document.getElementById("require4").classList.remove("valid");
            document.getElementById("require4").classList.add("invalid");
        }

        if (pwd.value === pwdConfirm.value)
        {
            document.getElementById("require5").classList.remove("invalid");
            document.getElementById("require5").classList.add("valid");
        }
        else
        {
            document.getElementById("require5").classList.remove("valid");
            document.getElementById("require5").classList.add("invalid");
        }
    }

    return (
      <div className="RPregister-container">
  
          <div className="RPregister">

              <form className="register1-form">
                  <h2 id="registerh2" >Register</h2>
                  <div className="row">
                      <div className="col">
                          <div id="RPfirstName" className="form-group">
                              <label for="firstName">First Name</label>
                              <input ref={(c) => firstName = c} type="text" className="form-control" id="firstName"/>
                          </div>
                      </div>
                      <div className="col">
                          <div id="RPlastName" className="form-group">
                              <label for="lastName">Last Name</label>
                              <input ref={(c) => lastName = c} type="text" className="form-control" id="lastName"/>
                          </div>
                      </div>
                  </div>
                  <br/>
                  <div className="row">
                      <div className="col">
                          <div id="RPemail" className="form-group">
                              <label for="email">Email</label>
                              <input ref={(c) => email = c} type="email" className="form-control" title="please enter a valid please" required pattern="[\w]*@[\w]*.com" id="email"/>
                          </div>
                      </div>
                      <div className="col">
                          <div id="RPusername" className="form-group">
                              <label for="username">Username</label>
                              <input ref={(c) => username = c} type="text" className="form-control" id="username"/>
                          </div>
                      </div>
                  </div>
                  <br/>
                  <div className="row">
                      <div className="col">
                          <div id="RPassword" className="form-group">
                              <label for="password">Password</label>
                              <input ref={(c) => password = c} type="password" className="form-control" onKeyDown={fields} onFocus={fields} onBlur={inactives} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" id="password"/>
                          </div>
                      </div>
                      <div className="col">
                          <div id="RPconfirmPassword" className="form-group">
                              <label for="confirmPassword">Confirm Password</label>
                              <input ref={(c) => confirmPassword = c} type="password" onKeyDown={fields} onFocus={fields} onBlur={inactives}  className="form-control" id="confirmPassword"/>
                          </div>
                      </div>
                  </div>
                  <br/>

                  {(registrationSuccess && !errorMessage) && (
                      <div className="message success-message">{message}</div>
                  )}

                  {errorMessage && !registrationSuccess && (
                    <div className="message error-message">{errorMessage}</div>
                    )}

                    {errorMessage && !registrationSuccess && (<br/>)}


                {registrationSuccess && !errorMessage && (<br/>)}

                {!errorMessage && !registrationSuccess && (
                    <ul id="passwordRequirements">
                        <li className="invalid inactive" id="require1">Password must be at least 8 characters</li>
                        <li className="invalid inactive" id="require2">Password must have a lowercase</li>
                        <li className="invalid inactive" id="require3">Password must have an uppercase</li>
                        <li className="invalid inactive" id="require4">Password must have a number</li>
                        <li className="invalid inactive" id="require5">Passwords must match</li>
                    </ul>
                )}
  
                  <div id="RPbuttons" className="d-flex justify-content-center">
                      <input id="registerbtn" type="submit" className="btn btn-primary" onClick={doRegister}/>
                  </div>
                  <div className="RPholder">
                      <NavLink id="accountbtn" to="/login">Have an account?</NavLink>
                  </div>
              </form>
          </div>
      </div>
    );
  };

export default RegisterForm;  