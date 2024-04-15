const { getMongoClient } = require('../utils/database');
const { sortUsers } = require('../utils/sortUsers');

const addFriend = (async (req, res, next) =>
{
    // header: auth token
    // body: friend username
    // response: error

    let _friend = '';
    try
    {
        const { friend } = req.body;
        _friend = friend.trim();
        if (_friend === '') throw new Error();
    }    
    catch (e)
    {
        res.locals.ret.error = 'Bad request syntax. Missing or incorrect information.'
        res.status(400).json(res.locals.ret);
        return;
    }

    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        // check if friend exists
        const users = await db.collection('Users').find({ login: _friend }).toArray();
        if (users.length < 1)
        {
            res.locals.ret.error = _friend + ' is not a user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        let ids = sortUsers(users[0]._id.toString(), res.locals.token.id);

        // build request body
        const requestBody = { user1: ids[0], user2: ids[1] };

        // check if relationship already exists in collection
        const relationships = await db.collection('Relationships').find(requestBody).toArray();
        if (relationships.length < 1)
        {
            // if relationship doesn't exist, insert it
            requestBody.relationshipType = 'friends';
            const insert = await db.collection('Relationships').insertOne(requestBody);
            if (insert.insertedCount === 0) throw new Error();
        }
        else
        {
            // if users are already friends
            if (relationships[0].relationshipType == 'friends')
            {
                res.locals.ret.error = 'Already friends with ' + _friend + '.';
                res.status(409).json(res.locals.ret);
                return;
            }

            // update relationship type
            db.collection('Relationships').updateOne(requestBody, 
                {
                    $set: { relationshipType: 'friends' }
                });
        }
        
        res.status(200).json(res.locals.ret);
        return;
    }
    catch(e)
    {
        res.locals.ret.error = 'Encountered an error while adding friend.';
        res.status(500).json(res.locals.ret);
        return;
    }    
});

module.exports = { addFriend };