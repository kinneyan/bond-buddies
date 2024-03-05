const removeFriend = (async (req, res, next) => 
{
    // header: auth token
    // body: friend username
    // response: error

    // process body
    let _friend = '';
    try
    {
        const { friend } = req.body;
        _friend = friend.trim();
    }    
    catch (e)
    {
        res.locals.ret.error = 'Bad request syntax. Missing or incorrect information.'
        res.status(400).json(res.locals.ret);
        return;
    }

    const requestBody = 
    {
        user1: res.locals.token.login,
        user2: _friend
    }

    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        const query = await db.collection('Users').find(body).toArray();

        if (query.length < 1)
        {
            res.locals.ret.error = 'Could not find friendship.'
            res.status(200).json(res.locals.ret);
        }
    }
    catch (e) 
    {

    }

    res.status(200).json(res.locals.ret);
});

module.exports = { removeFriend };