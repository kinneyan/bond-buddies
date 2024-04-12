const { getMongoClient } = require('../utils/database');

const similarUsers = async (req, res, next) => {

    let responseArray = [];
    res.locals.ret.similarUsers = [];
    try {
        const client = getMongoClient();
        await client.connect();
        const db = client.db();

        // Get personality, disc, and friendship assessment results for current user
        const [personality, disc, friendship] = await Promise.all([
            db.collection('Personality').findOne({ login: res.locals.token.login }, { projection: { result: 1 } }),
            db.collection('DISC').findOne({ login: res.locals.token.login }, { projection: { result: 1 } }),
            db.collection('Friendship').findOne({ login: res.locals.token.login }, { projection: { result: 1 } })
        ]);

        if (!personality.result || !disc.result || !friendship.result) {
            res.locals.ret.error = 'Server failed to get assessment results for current user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        // Iterate through users to find similar ones
        for await (const user of db.collection('Users').find({}))
        {
            // skip self
            if (user.login === res.locals.token.login) continue;

            const [ personalityResult, discResult, friendshipResult ] = await Promise.all([
                db.collection('Personality').findOne({ login: user.login }, { projection: { result: 1 } }),
                db.collection('DISC').findOne({ login: user.login }, { projection: { result: 1 } }),
                db.collection('Friendship').findOne({ login: user.login }, { projection: { result: 1 } })
            ]);
    
            if (!personalityResult || !discResult || !friendshipResult) {
                // If any assessment result is missing for the current user, skip this user
                continue;
            }
    
            // Check if assessment results match for compatibility
            if (personality.result === personalityResult.result || disc.result === discResult.result || friendship.result === friendshipResult.result) {
                    res.locals.ret.similarUsers.push(user.login);
            }
        }

        res.locals.ret.error = '';
        res.status(200).json(res.locals.ret);
    } catch (e) {
        res.locals.ret.error = 'Encountered an error while finding similar users.';
        res.status(500).json(res.locals.ret);
    }
};

module.exports = { similarUsers };
