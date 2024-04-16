const { getMongoClient } = require('../utils/database');
const { scoreTest } = require('../utils/scoring');

const updateAssessment = (async (req, res, next) => 
{
    // header: auth token
    // body: assessment (int), responses (int array)
    // response: error

    const ASSESSMENT_LENGTH = 20;

    // read body
    let assessment = -1;
    let responseArray = [];
    let results = {};
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
        results = scoreTest(assessment, responses);

        if (responses.length != ASSESSMENT_LENGTH)
        {
            res.locals.ret.error = 'Bad request. Responses should have length ' + ASSESSMENT_LENGTH + '.';
            throw new Error();
        }
        responseArray = responses;

        if (results.type == '' )
        {
            res.locals.ret.error = 'Could not score results.';
            throw new Error();
        }
    }
    catch (e)
    {
        if (res.locals.ret.error === '') res.locals.ret.error = 'Bad request. Missing or invalid information.';
        res.status(400).json(res.locals.ret);
        return;
    }

    try
    {
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        const [ assessmentUpdate, buddyTypeUpdate ] = await Promise.all
        ([
            db.collection(assessment).updateOne(
                { login: res.locals.token.login },
                { $set: { responses: responseArray, result: results.type, description: results.description }},
                { upsert: true }
            ),
            db.collection('Users').updateOne
            (
                { login: res.locals.token.login },
                { $set: { buddyType: results.buddyType }}
            )
        ])

        if (assessmentUpdate.modifiedCount < 1 && assessmentUpdate.upsertedCount < 1)
        {
            res.locals.ret.error = 'Responses already up-to-date.';
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