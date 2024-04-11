const { getMongoClient } = require('../utils/database');

const similarUsers = async (req, res, next) => {
    let responseArray = [];

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

        if (!personality || !disc || !friendship) {
            res.locals.ret.error = 'Server failed to get assessment results for current user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        // Iterate through users to find similar ones
        const cursor = db.collection('Users').find({});
        await cursor.forEach(async user => {
            const [personalityResult, discResult, friendshipResult] = await Promise.all([
                db.collection('Personality').findOne({ login: user.login }, { projection: { result: 1 } }),
                db.collection('DISC').findOne({ login: user.login }, { projection: { result: 1 } }),
                db.collection('Friendship').findOne({ login: user.login }, { projection: { result: 1 } })
            ]);

            if (!personalityResult || !discResult || !friendshipResult) {
                // If any assessment result is missing for the current user, skip this user
                return;
            }

            // Check if assessment results match for compatibility
            if (
                personality.result === personalityResult.result ||
                disc.result === discResult.result ||
                friendship.result === friendshipResult.result
            ) {
                responseArray.push({
                    username: user.username,
                    personality: personalityResult.result,
                    disc: discResult.result,
                    friendship: friendshipResult.result
                });
            }
        });

        res.locals.ret.error = '';
        res.locals.ret.similarUsers = responseArray;
        res.status(200).json(res.locals.ret);
    } catch (e) {
        console.error(e);
        res.locals.ret.error = 'Encountered an error while finding similar users.';
        res.status(500).json(res.locals.ret);
    }
};

module.exports = { similarUsers };
