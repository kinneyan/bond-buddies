const { getMongoClient } = require('../utils/database');

const similarUsers = async (req, res, next) => {
    let responseArray = [];

    try {
        const client = getMongoClient();
        await client.connect();
        const db = client.db();

        // Get personality assessment result for current user
        const personality = await db.collection('Personality').findOne(
            { login: res.locals.token.login },
            { projection: { result: 1 } }
        );

        if (!personality) {
            res.locals.ret.error = 'Server failed to get personality assessment result for current user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        // Get disc assessment result for current user
        const disc = await db.collection('DISC').findOne(
            { login: res.locals.token.login },
            { projection: { result: 1 } }
        );

        if (!disc) {
            res.locals.ret.error = 'Server failed to get disc assessment result for current user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        // Get friendship assessment result for current user
        const friendship = await db.collection('Friendship').findOne(
            { login: res.locals.token.login },
            { projection: { result: 1 } }
        );

        if (!friendship) {
            res.locals.ret.error = 'Server failed to get friendship assessment result for current user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        // Iterate through users table to get assessment result field for each user
        const user = db.collection('Users').find({});
        await user.forEach(async user => {
            // Fetch the result field from personality, disc, and friendship collections for each user
            const personalityResult = await db.collection('Personality').findOne(
                { login: user.login },
                { projection: { result: 1 } }
            );
            if(!personalityResult){
                res.locals.ret.error = 'Server failed to get personality assessment result for other user.';
                res.status(409).json(res.locals.ret);
                return;
            }
            const discResult = await db.collection('DISC').findOne(
                { login: user.login },
                { projection: { result: 1 } }
            );
            if(!discResult){
                res.locals.ret.error = 'Server failed to get DISC assessment result for other user.';
                res.status(409).json(res.locals.ret);
                return;
            }
            const friendshipResult = await db.collection('Friendship').findOne(
                { login: user.login },
                { projection: { result: 1 } }
            );
            if(!friendshipResult){
                res.locals.ret.error = 'Server failed to get friendship assessment result for other user.';
                res.status(409).json(res.locals.ret);
                return;
            }
            // check if assessment results are the same for compatbility 
            if(personality.result == personalityResult.result){
                responseArray.push({
                    username: user.username,
                    personality: personalityResult.result,
                    disc: discResult.result,
                    friendship: friendshipResult.result
                }); 
                return true;
            }
            if(disc.result == discResult.result){
                responseArray.push({
                    username: user.username,
                    personality: personalityResult.result,
                    disc: discResult.result,
                    friendship: friendshipResult.result
                });
                return true;
            }
            if(friendship.result == friendshipResult.result){
                responseArray.push({
                    username: user.username,
                    personality: personalityResult.result,
                    disc: discResult.result,
                    friendship: friendshipResult.result
                });
                return true;
            }
        });

        res.locals.ret.error = '';
        res.locals.ret.similarUsers = responseArray;
        res.status(200).json(res.locals.ret);
        return;
    } catch (e) {
        console.log(e);
        res.locals.ret.error = 'Encountered an error while finding similar users.';
        res.status(500).json(res.locals.ret);
        return;
    }
};

module.exports = { similarUsers };
