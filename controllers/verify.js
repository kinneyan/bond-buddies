const { getMongoClient } = require('../utils/database');
const ObjectId = require('mongodb').ObjectId;

const verifyUser = (async (req, res, next) => 
{
    try 
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        const verify = await db.collection('Users').updateOne(
            { login: res.locals.token.login, _id: ObjectId.createFromHexString(res.locals.token.id) },
            { $set: { verified: true }}
        );

        if (verify.matchedCount < 1)
        {
            res.locals.ret.error = 'Could not find user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        if (verify.modifiedCount < 1)
        {
            res.locals.ret.error = 'User already verified.';
            res.status(200).json(res.locals.ret);
            return;
        }

        res.locals.ret.error = '';
        res.status(200).json(res.locals.ret);
        return;
    }
    catch (e)
    {
        res.locals.ret.error = 'Could not verify user.';
        res.status(500).json(res.locals.ret);
        return;
    }
});

module.exports = { verifyUser };