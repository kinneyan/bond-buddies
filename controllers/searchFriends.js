const { getMongoClient } = require('../utils/database');

const searchFriends = async (req, res, next) => {
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
                { FirstName: { $regex: new RegExp(_search, 'i') } }, // Case-insensitive regex for first name
                { LastName: { $regex: new RegExp(_search, 'i') } },  // Case-insensitive regex for last name
                { Email: { $regex: new RegExp(_search, 'i') } },     // Case-insensitive regex for email
                { Login: { $regex: new RegExp(_search, 'i') } }      // Case-insensitive regex for username
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
            console.log("USER: " + user.Login);

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
                console.log("Login: " + user.Login);
                console.log("First Name: " + user.FirstName);
                console.log("Last Name: " + user.LastName);
                console.log("Relationship: " + relationships[0].RelationshipType);

                const userObject = {
                    login: user.Login,
                    firstName: user.FirstName,
                    lastName: user.LastName,
                    relationshipType: relationships[0].RelationshipType
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
};

module.exports = { searchFriends };