const { getMongoClient } = require('../utils/database');

const unblockUser = async (req, res, next) => {
    // header: auth token
    // body: blocked user's username
    // response: error

    // process body
    let _user = '';
    try {
        const { user } = req.body;
        _user = user.trim();
        if (_user === '') throw new Error();
    } catch (e) {
        res.locals.ret.error = 'Bad request syntax. Missing or incorrect information.';
        res.status(400).json(res.locals.ret);
        return;
    }

    try {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        // check if blocked user exists
        const users = await db.collection('Users').find({ login: _user }).toArray();
        if (users.length < 1) {
            res.locals.ret.error = _user + ' is not a user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        /*
        * Sort ids so that no matter the two users that are 
        * passed (authorized user, blocked user), they are always formatted
        * in the same way because their _ids should never change. This
        * allows us to not have to check if the relationship is
        * flipped (e.g. blocked user in user1 vs user2).
        */
        let ids = [users[0]._id.toString(), res.locals.token.id];
        ids.sort((a, b) => {
            return a.localeCompare(b);
        });

        // build request body
        const requestBody = { user1: ids[0], user2: ids[1] };

        // check if relationship exists and is blocked
        const relationship = await db.collection('Relationships').findOne(requestBody);
        if (!relationship || !relationship.blocked) {
            res.locals.ret.error = _user + ' is not blocked.';
            res.status(409).json(res.locals.ret);
            return;
        }

        // Update the relationship to unblock the user
        const updateResult = await db.collection('Relationships').updateOne(requestBody, { $unset: { blocked: "false" } });

        // Check if update occurred
        if (updateResult.modifiedCount === 0) throw new Error();
    } catch (e) {
        res.locals.ret.error = 'Encountered an error while unblocking user.';
        res.status(500).json(res.locals.ret);
        return;
    }

    res.status(200).json(res.locals.ret);
};

module.exports = { unblockUser };
