const getResults = (async (req, res, next) => 
{
    // header: auth token
    // response: interpreted assessment results

    try 
    {
        
    }
    catch (e)
    {
        res.locals.ret.error = 'Could not interpret assessment results.';
        res.status(500).json(res.locals.ret);
        return;
    }
});

module.exports = { getResults };