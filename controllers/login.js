const { getMongoClient } = require('../utils/database');
const { shaHash } = require('../utils/hash');
const { generateJWT } = require('../utils/auth');

const login = (async (req, res, next) =>
{
    // body: username, password
    // response: JWT bearer token

    // initialize response object
    let ret = {};
    ret.error = '';

    // process body
    const { username, password } = req.body;
    let _username = username.trim();
    let _password = password.trim();

    const body = 
    {
        Login: _username,
        Password: shaHash(_password)
    }

    try 
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        // check if user with provided username exists
        const query = await db.collection('Users').find(body).toArray();

        /*
        * Technically there could be more than one user with the same username
        * but this should have only happened when I was developing the register
        * endpoint. So, if somehow, someone got a duplicate username, sucks to
        * suck. 
        */
       
        // if no results were found
        if (query.length < 1)
        {
            ret.error = 'Username or password is incorrect.';
            res.status(200).json(ret);
            return;
        }
        
        // build bearer token
        const tokenBody = 
        {
            id: query[0]._id.toString(),
            login: body.Login
        }
        ret.bearer = await generateJWT(tokenBody);

        // add user information
        ret.firstName = query[0].FirstName;
        ret.lastName = query[0].LastName;
        
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

module.exports = { login };