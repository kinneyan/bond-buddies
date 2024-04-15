const { getMongoClient } = require('../utils/database');
const { generateSGAPI } = require('../utils/auth');
const sgMail = require('@sendgrid/mail')
const SG_API_KEY = generateSGAPI();

sgMail.setApiKey(SG_API_KEY);

const forgotPassword = (async (req, res, next) =>
{
    let login, email = '';
    try
    {   
        login = req.body.login.trim();
        email = req.body.email.trim();
        if (login == '' || email == '') throw new Error();
    }
    catch (e)
    {
        res.locals.ret.error = 'Bad request. Invalid or incomplete body.';
        res.status(400).json(res.locals.ret);
        return;
    }

    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        const user = await db.collection('Users').find({ login: login, email: email }).toArray();

        if (user.length < 1)
        {
            res.locals.ret.error = 'Could not find user.';
            res.status(409).json(res.locals.ret);
            return;
        }
    }
    catch (e)
    {
        res.locals.ret.error = 'Encountered an issue checking for user.';
        res.status(500).json(res.locals.ret);
        return;
    }

    try
    {
        const url = `https://bondbuddies.com/reset`;
        const message = 
        {
            to: email,
            from: 
            {
                name: "Bond Buddies",
                email: "bondbuddiesofficial@gmail.com"
            },
            subject: 'Password Reset Request',
            text: 'Click the link below to reset your password.',
            html: '<h1>Click the link below to reset your password.</h1><p><a href=' + url + '>Reset Password</a></p>'
        }

        sgMail.send(message)
        .then((response) =>
        {
            res.locals.ret.error = '';
            res.status(200).json(res.locals.ret);
            return;
        })
        .catch((error) =>
        {
            throw new Error();
        })
    }
    catch (e)
    {
        res.locals.ret.error = 'Failed to send password reset email.';
        res.status(500).json(res.locals.ret);
        return;
    }
});

module.exports = { forgotPassword };