const { getMongoClient } = require('../utils/database');
const ObjectId = require('mongodb').ObjectId;
const { generateSGAPI } = require('../utils/auth');
const sgMail = require('@sendgrid/mail')
const SG_API_KEY = generateSGAPI();

sgMail.setApiKey(SG_API_KEY);

const emailVerification = (async (req, res, next) => 
{
    // header: auth token
    // response: error, email message
        
    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        const user = await db.collection('Users').find({ login: res.locals.token.login, _id: ObjectId.createFromHexString(res.locals.token.id) },
            { 
                projection: { _id: 0, login: 1, firstName: 1, lastName: 1, email: 1 } 
            }
        ).toArray();

        if (user.length < 1)
        {
            res.locals.ret.error = 'Could not find user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        res.locals.ret.email = user[0].email;

        const token = res.locals.token;

        const url = `https://bondbuddies.com/login?token=${token}`;

        const message = {
            to: user[0].email,
            from: {
                name: "Bond Buddies",
                email: 'bondbuddiesofficial@gmail.com'
            },
            subject: 'Please Verify Your Email',
            text: 'Please click the link below to verify your email.',
            html: `<h1>Please click the link below to verify your email.</h1><p><a href="${url}">Verify Email</a></p>`

        }
        sgMail.send(message)
        .then(response => console.log('Email Sent!'))
        .catch(error => console.log(error.message));
        res.status(200).json({ results: results });
        res.status(200).json(res.locals.ret);

    }
    catch(e){
        res.locals.ret.error = '';
        res.status(500).json(res.locals.ret);
        return;
    }
    
});

module.exports = { emailVerification };