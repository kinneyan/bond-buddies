const { verifyJWT } = require('../utils/auth');

const authenticate = (async (req, res, next) =>
{
    res.locals.ret = {};
    res.locals.ret.error = '';
    
    try
    {
        // check for authorization header
        const auth = req.get('Authorization');
        if (auth === undefined) throw new Error();

        // verify bearer
        const token = await verifyJWT(auth.split(' ')[1]);
        if (Object.keys(token).length < 1) throw new Error();

        // save token body
        res.locals.token = token;
    }
    catch (e)
    {
        res.locals.ret.error = 'Could not authenticate request.';
        res.status(401).json(res.locals.ret);
        return;
    }

    next();
});

module.exports = { authenticate };