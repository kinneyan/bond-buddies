const { getMongoClient } = require('../utils/database');

const searchFriends = (async (req, res, next) => {
    // header: auth token
    
    // incoming: search

    // outgoing: friends object array or error

    let _search = '';
    res.locals.ret.friends = [];
    let friends = [];
    let ids = [];
    let requestBody = {};

    try {
        const { search } = req.body;
        _search = search.trim();
        if (_search === '') throw new Error();
    } catch (e) {
        res.locals.ret.error = 'Bad request syntax. Missing or incorrect information.'
        res.status(400).json(res.locals.ret);
        return;
    }

    try {
        const client = getMongoClient();
        await client.connect();
        const db = client.db();

        // check if search exists as a user by first name, last name, email, or username (case-insensitive)
        const users = await db.collection('Users').find({
            $or: [
                { firstName: { $regex: new RegExp(_search, 'i') } }, // Case-insensitive regex for first name
                { lastName: { $regex: new RegExp(_search, 'i') } },  // Case-insensitive regex for last name
                { email: { $regex: new RegExp(_search, 'i') } },     // Case-insensitive regex for email
                { login: { $regex: new RegExp(_search, 'i') } }      // Case-insensitive regex for username
            ]
        }).toArray();

        // check if user exists
        if (users.length < 1) {
            res.locals.ret.error = _search + ' is not a user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        // Iterate through Users to find matches to the search
        for (const user of users){

            // skip self
            if (user.Login === res.locals.token.login) continue;

            ids = [user._id.toString(), res.locals.token.id];
            ids.sort((a, b) =>
            {
                return a.localeCompare(b);
            });

            // build request body
            requestBody = { user1: ids[0], user2: ids[1] };
    
            // check if there is an existing relationship
            const relationships = await db.collection('Relationships').find(requestBody).toArray();

            if (relationships.length < 1 || relationships[0].blocked)
            {
                continue;
            }
            else{
                const friendBuddyType = await db.collection('Users').find({ login: user.login }).toArray();

                const userObject = {
                    login: user.login,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    relationshipType: relationships[0].relationshipType,
                    buddyType: friendBuddyType[0].buddyType || ''
                };

                friends.push(userObject);
            }
        }
        res.locals.ret.friends = friends;
        res.status(200).json(res.locals.ret);
        return;

    } catch (e) {
        res.locals.ret.error = 'Encountered an error while searching for friend.';
        res.status(500).json(res.locals.ret);
        return;
    }
});

module.exports = { searchFriends };