const app_name = "bondbuddies.com/"
function buildPath(route)
{
    if(process.env.NODE_ENV === 'production')
        return "http://" + app_name + route;
    else
        return "http://localhost:3001/" + route;
}

function Settings()
{
    var username;
    var password;
    var confirmPassword;
    var firstName;
    var lastName;
    var email;
    var bearer;
    
    return (
        <div className="editinfo-container">
            <div className="editinfo">
                <form className="editinfo-form">
                    <h2 id="editTitle">Edit Information</h2>
                    <div className="row">
                        <div className="col">
                            <div id="firstName" className="SPform-group">
                                <label for="firstName">First Name</label>
                                <input ref={(c) => firstName = c} type="firstName" className="form-control" id="firstName"/>
                            </div>
                        </div>
                        <div className="col">
                            <div id="lastName" className="SPform-group">
                                <label for="lastName">Last Name</label>
                                <input ref={(c) => lastName = c} type="lastName" className="form-control" id="lastName"/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <div id="email" className="SPform-group">
                                <label for="email">Email</label>
                                <input ref={(c) => email = c} type="email" className="form-control" id="email"/>
                            </div>
                        </div>
                        <div className="col">
                            <div id="username" className="SPform-group">
                                <label for="username">Username</label>
                                <input ref={(c) => username = c} type="username" className="form-control" id="username"/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <div className="SPform-group">
                                <label for="password">Password</label>
                                <input ref={(c) => password = c} type="password" className="form-control" id="password"/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="SPform-group">
                                <label for="confirmPassword">Confirm Password</label>
                                <input ref={(c) => confirmPassword = c} type="password" className="form-control" id="confirmPassword"/>
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
}

export default Settings