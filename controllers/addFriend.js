const { getMongoClient } = require('../utils/database');

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
        const users = await db.collection('Users').find({ Login: _friend }).toArray();
        if (users.length < 1)
        {
            res.locals.ret.error = _friend + ' is not a user.';
            res.status(200).json(res.locals.ret);
            return;
        }

        /*
        * Sort ids so that no matter the two users that are 
        * passed (authorized user, friend), they are always formatted
        * in the same way because their _ids should never change. This
        * allows us to not have to check if the relationship is
        * flipped (e.g. friend in user1 vs user2).
        */
        let ids = [users[0]._id.toString(), res.locals.token.id];
        ids.sort((a, b) =>
        {
            return a.localeCompare(b);
        });

        // build request body
        const requestBody = { user1: ids[0], user2: ids[1] };

        // check if relationship already exists in collection
        const relationships = await db.collection('Relationships').find(requestBody).toArray();
        if (relationships.length < 1)
        {
            // if relationship doesn't exist, insert it
            requestBody.RelationshipType = 'friends';
            const insert = await db.collection('Relationships').insertOne(requestBody);
            if (insert.acknowledged === true && insert.insertedCount === 0) throw new Error();
        }
        else
        {
            // if users are already friends
            if (relationships[0].RelationshipType == 'friends')
            {
                res.locals.ret.error = 'Already friends with ' + _friend + '.';
                res.status(200).json(res.locals.ret);
                return;
            }

            // update relationship type
            db.collection('Relationships').updateOne(requestBody, 
                {
                    $set:
                    {
                        RelationshipType: 'friends'
                    }
                });
        }
        
        res.status(200).json(res.locals.ret);
        return;
    }
    catch(e)
    {
        console.log(e.toString());
        res.locals.ret.error = 'Encountered an error while adding friend.';
        res.status(500).json(res.locals.ret);
        return;
    }    
});

module.exports = { addFriend };