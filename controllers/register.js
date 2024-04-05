const { getMongoClient } = require('../utils/database');
const { shaHash } = require('../utils/hash');
const { generateJWT } = require('../utils/auth');

const register = (async (req, res, next) => 
{
    // body: username, password, confirmPassword, firstName, lastName, email
    // response: JWT bearer token

    // initialize response object
    let ret = {};
    ret.error = '';

    let _username = '';
    let _password = '';
    let _confirmPassword = '';
    let _firstName = '';
    let _lastName = '';
    let _email = '';

    try
    {
        // process body 
        const { username, password, confirmPassword, firstName, lastName, email } = req.body;
        _username = username.trim();
        _password = password.trim();
        _confirmPassword = confirmPassword.trim();
        _firstName = firstName.trim();
        _lastName = lastName.trim();
        _email = email.trim();
    }
    catch (e) 
    {
        ret.error = 'Bad request syntax. Missing or incorrect information.'
        res.status(400).json(ret);
        return;
    }

    // check if passwords match
    if (_password !== _confirmPassword)
    {
        ret.error = "Passwords do not match.";
        res.status(400).json(ret);
        return;
    }
    
    const newUser = 
    {
        firstName: _firstName,
        lastName: _lastName,
        login: _username,
        password: shaHash(_password),
        email: _email
    }

    try
    {
        // send user to the database 
        const client = getMongoClient();
        client.connect();
        const db = client.db()

        // check if username exists
        const duplicate = await db.collection('Users').find({login: newUser.login}).toArray();
        if (duplicate.length > 0)
        {
            ret.error = "Username is already taken.";
            res.status(409).json(ret);
            return;
        }
        else 
        {
            const res = db.collection('Users').insertOne(newUser);
            const tokenBody = 
            {
                id: newUser._id.toString(),
                login: newUser.login
            }
            ret.bearer = 'Bearer ' + await generateJWT(tokenBody);
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