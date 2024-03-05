const { verifyJWT } = require('../utils/auth');

const removeFriend = (async (req, res, next) => 
{
    // header: auth token
    // body: friend username
    // response: error

    // initialize response object
    let ret = {};
    ret.error = '';


    const token = req.get('Authorization');
    if (token === undefined)
    {
        ret.error = 'Could not authenticate request.';
        res.status(401).json(ret);
        return;
    }

    res.status(200).json({});
});

module.exports = { removeFriend };