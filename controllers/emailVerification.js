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
        const { emailType } = req.body;

        const client = getMongoClient();
        client.connect();
        const db = client.db();

        const user = await db.collection('Users').find({ login: res.locals.token.login, _id: ObjectId.createFromHexString(res.locals.token.id) },
            { 
                projection: { email: 1 } 
            }
        ).toArray();

        if (user.length < 1)
        {
            res.locals.ret.error = 'Could not find user.';
            res.status(409).json(res.locals.ret);
            return;
        }

        res.locals.ret.email = user[0].email;


        const verify_url = `https://bondbuddies.com/verify`;
        const reset_url = `https://bondbuddies.com/reset`;

        const message = {
            to: user[0].email,
            from: {
                name: "Bond Buddies",
                email: 'bondbuddiesofficial@gmail.com'
            },
            subject: '',
            text: '',
            html: ''
        };
        
        if (emailType === 0) {
            message.subject = 'Please Verify Your Email';
            message.text = 'Please click the link below to verify your email.';
            message.html = `<h1>Please click the link below to verify your email.</h1><p><a href="${verify_url}">Verify Email</a></p>`;
        } else if (emailType === 1) {
            message.subject = 'Password Reset Request';
            message.text = 'Please click the link below to reset your password.';
            message.html = `<h1>Please click the link below to reset your password.</h1><p><a href="${reset_url}">Reset Password</a></p>`;
        }
    
        sgMail.send(message)
        .then(response => console.log('Email Sent!'))
        .catch(error => console.log(error.message));
        res.status(200).json({ results: results });
        res.status(200).json(res.locals.ret);

    }
    catch(e){
        res.locals.ret.error = '';
        return;
    }
    
});

module.exports = { emailVerification };