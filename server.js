const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

// initialize express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// initialize db connection
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PATCH, DELETE, OPTIONS'
            );
            next();
});
        
app.listen(5000); // start Node + Express server on port 5000

app.post('/api/register', async (req, res, next) =>
{
    // body: username, password, firstName, lastName, email
    // response: JWT bearer token

    // initialize response object
    let ret = {};

    // process body 
    const { username, password, firstName, lastName, email } = req.body;
    let _username = username.trim();
    let _password = password.trim();
    let _firstName = firstName.trim();
    let _lastName = lastName.trim();
    let _email = email.trim();

    // hash password
    let hashedPassword = crypto.createHash('sha256').update(_password);
    
    const newUser = 
    {
        FirstName: _firstName,
        LastName: _lastName,
        Login: _username,
        Password: hashedPassword.digest('base64'),
        Email: _email
    }

    // send user to the database 
    try
    {
        const db = client.db()

        // check if username exists
        const duplicate = await db.collection('Users').find({Login: newUser.Login}).toArray();
        if (duplicate.length > 0)
        {
            ret.error = "Username is already taken.";
        }
        else 
        {
            const res = db.collection('Users').insertOne(newUser);
        }

        // return success
        res.status(200).json(ret);
    }
    catch (e)
    {
        ret.error = e.toString();

        // return internal server error
        res.status(500).json(ret);
    }
});
