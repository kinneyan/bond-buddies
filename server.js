const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

app.post('/api/register', async (req, res, next) =>
{
    // payload: username, password, firstName, lastName
    // response: ?

    // initialize error string
    let error = '';

    const { username, password, firstName, lastName } = req.body;
    let _username = username.trim();
    let _password = password.trim();
    let _firstName = firstName.trim();
    let _lastName = lastName.trim();


});

app.listen(5000); // start Node + Express server on port 5000