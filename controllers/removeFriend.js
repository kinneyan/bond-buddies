const removeFriend = (async (req, res, next) => 
{
    // header: auth token
    // body: friend username
    // response: error

    res.status(200).json(res.locals.ret);
});

module.exports = { removeFriend };