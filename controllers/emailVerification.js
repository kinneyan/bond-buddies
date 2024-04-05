const { getMongoClient } = require('../utils/database');
const { generateSGAPI } = require('../utils/auth');
const sgMail = require('@sendgrid/mail')
const API_KEY = generateSGAPI();
sgMail.setApiKey(API_KEY);

const emailVerification = (async (req, res, next) => 
{
    // incoming: userId
    // outgoing: email message

    const requestBody = 
    {
        user1: res.locals.token.login,
    }

    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        const results = await db.collection('Users').find(requestBody).toArray();
        
        if (results.length > 0) {
            const email = user ? user.email : null;
            const message = {
                to: email,
                from: 'bondbuddiesofficial@gmail.com',
                subject: 'Please Verify Your Email',
                text: 'Please click the link below to verify your email.',
                html: '<h1>Please click the link below to verify your email.</h1>'

            }
            sgMail.send(message).then(response=>console.log('Email Sent!')).catch(error=> console.log(error.message))
            res.status(200).json({ results: results });
        } 
        else {
            res.locals.ret.error = 'Could not find user.'
            res.status(200).json(res.locals.ret);
            return;
        }
        res.status(200).json(res.locals.ret);

    }
    catch(e){
        res.locals.ret.error = 'Encountered an error while trying to send a verification email.';
        res.status(500).json(res.locals.ret);
        return;
    }
    
});

module.exports = { emailVerification };