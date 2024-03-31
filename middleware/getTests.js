const { getMongoClient } = require('../utils/database');

const getTests = (async (req, res, next) => 
{
    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        // check for personality test
        const personality = db.collection('Personality').find(
            { login: res.locals.token.login }
        )
    }
    catch (e)
    {
        res.locals.ret.error = 'Could not get test responses from server.';
        res.status(500).json(res.locals.ret);
        return;
    }
});

module.exports = { getTests };