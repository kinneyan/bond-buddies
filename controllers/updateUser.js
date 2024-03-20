const { getMongoClient } = require("../utils/database");

const update = (async (req, res, next) =>
{
    // header: auth token
    // body: information to be changed
    // response: error
    
    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();
        
        const update = await db.collection('Users').updateOne(
            { Login: res.locals.token.login }, 
            { $set: req.body }
        );

        if (update.matchedCount < 1)
        {
            res.locals.ret.error = 'Failed to find user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        if (update.modifiedCount < 1)
        {
            res.locals.ret.error = 'Server failed to update user.';
            res.status(409).json(res.locals.ret);
            return;
        }
        
        res.locals.ret.error = '';
        res.status(200).json(res.locals.ret);
        return;
    }
    catch (e)
    {
        res.locals.ret.error = 'Encountered an error while attempting to update user.';
        res.status(500).json(res.locals.ret);
        return;
    }
});

module.exports = { update };