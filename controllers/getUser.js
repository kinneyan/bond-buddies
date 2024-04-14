const { getMongoClient } = require('../utils/database');
const ObjectId = require('mongodb').ObjectId;

const getUser = (async (req, res, next) => 
{
    // header: auth token
    // response: error, user information

    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        const query = await db.collection('Users').find({ login: res.locals.token.login, _id: ObjectId.createFromHexString(res.locals.token.id) },
            { 
                projection: { _id: 0, login: 1, firstName: 1, lastName: 1, email: 1 } 
            }
        ).toArray();
        
        // check that an object was returned
        if (query.length < 1)
        {
            res.locals.ret.error = 'Could not get user information from server.';
            res.status(409).json(res.locals.ret);
            return;
        }

        // Copy query to response object
        res.locals.ret.error = '';
        res.locals.ret.login = query[0].login;
        res.locals.ret.firstName = query[0].firstName;
        res.locals.ret.lastName = query[0].lastName;
        res.locals.ret.email = query[0].email;

        res.status(200).json(res.locals.ret);
        return;
    }
    catch (e)
    {
        console.log(e);
        res.locals.ret.error = 'Encountered an error while getting user information.';
        res.status(500).json(res.locals.ret);
        return;
    }
});

module.exports = { getUser };