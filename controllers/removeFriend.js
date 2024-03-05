const { getMongoClient } = require('../utils/database');

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
    }    
    catch (e)
    {
        res.locals.ret.error = 'Bad request syntax. Missing or incorrect information.'
        res.status(400).json(res.locals.ret);
        return;
    }

    const requestBody = 
    {
        user1: res.locals.token.login,
        user2: _friend
    }

    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        // attempt to delete relationship
        const del = await db.collection('Relationships').deleteOne(requestBody);

        // check if deletion occured 
        if (del.acknowledged === true && del.deletedCount === 0)
        {
            res.locals.ret.error = 'Could not find friendship.'
            res.status(200).json(res.locals.ret);
            return;

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