const { getMongoClient } = require('../utils/database');
const { shaHash } = require('../utils/hash');

const resetPassword = (async (req, res, next) =>
{
    res.locals.ret = {};
    res.locals.ret.error = '';

    let _login, _email, _password = '';
    try
    {
        _login = req.body.login;
        _email = req.body.email;
        _password = req.body.password;
    }
    catch (e)
    {
        res.locals.ret.error = 'Bad request. Missing or invalid body.';
        res.status(400).json(res.locals.ret);
        return;
    }
    
    const login = _login.trim();
    const email = _email.trim();
    const password = shaHash(_password.trim());
    
    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();
        
        const update = await db.collection('Users').updateOne(
            { login: login, email: email },
            { $set: { password: password }}
        );
        
        if (update.matchedCount < 1)
        {
            res.locals.ret.error = 'Could not find user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        if (update.modifiedCount < 1)
        {
            res.locals.ret.error = 'Password cannot be same as current.';
            res.status(200).json(res.locals.ret);
            return;
        }

        res.locals.ret.error = '';
        res.status(200).json(res.locals.ret);
        return;
    }
    catch (e)
    {
        res.locals.ret.error = 'Failed to reset password.';
        res.status(500).json(res.locals.ret);
        return;
    }
});

module.exports = { resetPassword };