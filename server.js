const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// get port information
const PORT = process.env.PORT || 3001;

// get routes
const userRoutes = require('./routes/user');
const friendRoutes = require('./routes/friends');
const assessmentRoutes = require('./routes/assessments');

// initialize express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// set the port
app.set('port', PORT);

// link api routes
app.use('/user', userRoutes);
app.use('/friends', friendRoutes);
app.use('/assessments', assessmentRoutes);

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
   
// Start express
app.listen(PORT, () => 
{
    console.log('Server listening on port ' + PORT);
});

if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
