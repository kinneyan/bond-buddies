const { getMongoClient } = require('../utils/database');
const { sortUsers } = require('../utils/sortUsers');

const removeFriend = (async (req, res, next) => 
{
    // header: auth token
    // body: friend username
    // response: error

    // process body
    let _friend = '';
    try
    {
        const { friend } = req.body;
        _friend = friend.trim();
        if (_friend === '') throw new Error();
    }    
    catch (e)
    {
        res.locals.ret.error = 'Bad request syntax. Missing or incorrect information.'
        res.status(400).json(res.locals.ret);
        return;
    }

    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        // check if friend exists
        const users = await db.collection('Users').find({ login: _friend }).toArray();
        if (users.length < 1)
        {
            res.locals.ret.error = _friend + ' is not a user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        let ids = sortUsers(users[0]._id.toString(), res.locals.token.id);

        // build request body
        const requestBody = { user1: ids[0], user2: ids[1] };

        // check if relationship exists
        const relationships = await db.collection('Relationships').find(requestBody).toArray();
        if (relationships.length < 1)
        {
            res.locals.ret.error = _friend + ' is not a friend.';
            res.status(409).json(res.locals.ret);
            return;
        }
        else
        {
            const del = await db.collection('Relationships').deleteOne(requestBody);
    
            // check if deletion occured 
            if (del.deletedCount === 0) throw new Error();
        }
    }
    catch (e) 
    {
        res.locals.ret.error = 'Encountered an error while removing friend.';
        res.status(500).json(res.locals.ret);
        return;
    }

    res.status(200).json(res.locals.ret);
});

module.exports = { removeFriend };