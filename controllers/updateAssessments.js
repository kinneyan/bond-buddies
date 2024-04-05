const { getMongoClient } = require('../utils/database');

const updateAssessment = (async (req, res, next) => 
{
    // header: auth token
    // body: assessment (int), responses (int array)
    // response: error

    const ASSESSMENT_LENGTH = 20;

    // read body
    let assessment = -1;
    let responseArray = [];
    try
    {
        const { assessmentCode, responses } = req.body;
        
        switch (assessmentCode)
        {
            case 0:
                assessment = 'Personality';
                break;
            case 1:
                assessment = 'DISC';
                break;
            case 2:
                assessment = 'Friendship';
                break;
            default:
                throw new Error();
        }

        if (responses.length != ASSESSMENT_LENGTH) throw new error();
        responseArray = responses;
    }
    catch (e)
    {
        res.locals.ret.error = 'Bad request. Missing or invalid information.';
        res.status(400).json(res.locals.ret);
        return;
    }

    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        const update = await db.collection(assessment).updateOne(
            { login: res.locals.token.login },
            { $set: { responses: responseArray }},
            { upsert: true }
        );

        if (update.modifiedCount < 1)
        {
            res.locals.ret.error = 'Server failed to update responses.';
            res.status(409).json(res.locals.ret);
            return;
        }

        res.locals.ret.error = '';
        res.status(200).json(res.locals.ret);
        return;
    }
    catch (e)
    {
        console.log(e);
        res.locals.ret.error = 'Encoutered an error while updating assessment responses.';
        res.status(500).json(res.locals.ret);
        return;
    }
});

module.exports = { updateAssessment };