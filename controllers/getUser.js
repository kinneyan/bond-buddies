const { getMongoClient } = require('../utils/database');

const getUser = (async (req, res, next) => 
{
    // header: auth token
    // response: error, user information

    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        const query = await db.collection('Users').find({ Login: res.locals.token.login },
            { 
                projection: { _id: 0, Login: 1, FirstName: 1, LastName: 1, Email: 1 } 
            }
        ).toArray();
        
        // check that an object was returned
        if (query.length < 1)
        {
            res.locals.ret.error = 'Could not get user information from server.';
            ret.status(409).json(res.locals.ret);
            return;
        }

        /*
        * Copy query to response object
        * 
        * This isn't technically necessary to go through each
        * key, but is nice to keep the naming conventions similar
        * because the database uses pascal and everything else
        * uses camel. 
        */
        res.locals.ret.error = '';
        res.locals.ret.login = query[0].Login;
        res.locals.ret.firstName = query[0].FirstName;
        res.locals.ret.lastName = query[0].LastName;
        res.locals.ret.email = query[0].Email;

        res.status(200).json(res.locals.ret);
        return;
    }
    catch (e)
    {
        res.locals.ret.error = 'Encountered an error while getting user information.';
        res.status(500).json(res.locals.ret);
        return;
    }
});

module.exports = { getUser };