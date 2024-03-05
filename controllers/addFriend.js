const { getMongoClient } = require('../utils/database');

const addFriend = (async (req, res, next) =>
{
    // header: auth token
    // body: friend username
    // response: error

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

        // attempt to add relationship
        const insert = await db.collection('Relationships').insertOne(requestBody);
        // check if insert occurred 
        if (insert.acknowledged === true && insert.insertedCount === 0)
        {
            res.locals.ret.error = 'Could not add friendship.'
            res.status(200).json(res.locals.ret);
            return;

        }
    }
    catch(e)
    {
        res.locals.ret.error = 'Encountered an error while adding friend.';
        res.status(500).json(res.locals.ret);
        return;
    }
    res.status(200).json(res.locals.ret);
    
    
});
module.exports = { addFriend };