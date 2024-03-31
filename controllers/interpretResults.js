const { getMongoClient } = require('../utils/database');

const getResults = (async (req, res, next) => 
{
    // header: auth token
    // response: interpreted assessment results

    try 
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        let results = {};

        // check for personality test
        const personality = await db.collection('Personality').find({ login: res.locals.token.login }).toArray();
        if (personality.length < 1) throw new Error();

        results.error = '';
        results.personality = personality[0].result;
        res.status(200).json(results);
        return;
    }
    catch (e)
    {
        console.log(e);
        res.locals.ret.error = 'Could not interpret assessment results.';
        res.status(500).json(res.locals.ret);
        return;
    }
});

module.exports = { getResults };