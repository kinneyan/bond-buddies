const { getMongoClient } = require('../utils/database');
const { shaHash } = require('../utils/hash');

const register = (async (req, res) => 
{
    // body: username, password, firstName, lastName, email
    // response: JWT bearer token

    // initialize response object
    let ret = {};
    ret.error = '';

    // process body 
    const { username, password, firstName, lastName, email } = req.body;
    let _username = username.trim();
    let _password = password.trim();
    let _firstName = firstName.trim();
    let _lastName = lastName.trim();
    let _email = email.trim();
    
    const newUser = 
    {
        FirstName: _firstName,
        LastName: _lastName,
        Login: _username,
        Password: shaHash(_password),
        Email: _email
    }

    // send user to the database 
    try
    {
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
        }

        // return success
        res.status(200).json(ret);
    }
    catch (e)
    {
        ret.error = e.toString();

        // return internal server error
        res.status(500).json(ret);
    }
});

module.exports = { register };