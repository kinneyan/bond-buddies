const { getMongoClient } = require('../utils/database');
const { shaHash } = require('../utils/hash');
const { generateJWT, verifyJWT } = require('../utils/auth');

const register = (async (req, res, next) => 
{
    // body: username, password, confirmPassword, firstName, lastName, email
    // response: JWT bearer token

    // initialize response object
    let ret = {};
    ret.error = '';

    // process body 
    const { username, password, confirmPassword, firstName, lastName, email } = req.body;
    let _username = username.trim();
    let _password = password.trim();
    let _confirmPassword = confirmPassword.trim();
    let _firstName = firstName.trim();
    let _lastName = lastName.trim();
    let _email = email.trim();

    // check if passwords match
    if (_password !== _confirmPassword)
    {
        ret.error = "Passwords do not match.";
        res.status(200).json(ret);
        return;
    }
    
    const newUser = 
    {
        FirstName: _firstName,
        LastName: _lastName,
        Login: _username,
        Password: shaHash(_password),
        Email: _email
    }

    try
    {
        // send user to the database 
        const client = getMongoClient();
        client.connect();
        const db = client.db()

        // check if username exists
        const duplicate = await db.collection('Users').find({Login: newUser.Login}).toArray();
        if (duplicate.length > 0)
        {
            ret.error = "Username is already taken.";
        }
        else 
        {
            const res = db.collection('Users').insertOne(newUser);
            const tokenBody = 
            {
                id: newUser._id.toString(),
                login: newUser.Login
            }
            ret.bearer = await generateJWT(tokenBody);
        }
        
        // return success
        res.status(200).json(ret);
        return;
    }
    catch (e)
    {
        ret.error = e.toString();

        // return internal server error
        res.status(500).json(ret);
        return;
    }
});

module.exports = { register };