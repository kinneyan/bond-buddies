const { getMongoClient } = require('../utils/database');

const searchFriends = (async (req, res, next) => 
{
    // incoming: userId, search
    // outgoing: results or error

    let _search = '';
    try
    {
        const {search } = req.body;
        _search = search.trim();
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
        user2: _search
    }

    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        const results = await db.collection('Relationships').find(requestBody).toArray();
        
        if (results.length > 0) {
            res.status(200).json({ results: results });
        } 
        else {
            res.locals.ret.error = 'Could not find friendship.'
            res.status(200).json(res.locals.ret);
            return;
        }
        res.status(200).json(res.locals.ret);

    }
    catch(e){
        res.locals.ret.error = 'Encountered an error while searching for friend.';
        res.status(500).json(res.locals.ret);
        return;
    }
    
});

module.exports = { searchFriends };