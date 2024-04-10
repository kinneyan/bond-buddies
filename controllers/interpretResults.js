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
        const user = { login: res.locals.token.login };

        let results = {};

        // check for personality test
        const personality = await db.collection('Personality').find(user).toArray();
        if (personality.length >= 1)
        {
            results.personality = {};
            results.personality.type = personality[0].result;
            results.personality.description = personality[0].description;
        }
        
        const disc = await db.collection('DISC').find(user).toArray();
        if (disc.length >= 1)
        {
            results.disc = {};
            results.disc.type = disc[0].result;
            results.disc.description = disc[0].description;
        }

        const friendship = await db.collection('Friendship').find(user).toArray();
        if (friendship.length >= 1)
        {
            results.friendship = {};
            results.friendship.type = friendship[0].result;
            //desc
        }
        
        if (Object.keys(results) < 1) results.error = 'No assessment results found.';
        else results.error = '';
        
        res.status(200).json(results);
        return;
    }
    catch (e)
    {
        console.log(e);
        res.locals.ret.error = 'Could not get assessment results.';
        res.status(500).json(res.locals.ret);
        return;
    }
});

module.exports = { getResults };