const scorePersonality = (responses) =>
{
    let personalityJSON = require('../tests/personality.json');

    let cat1 = 0;
    let cat2 = 0;
    let cat3 = 0;
    let cat4 = 0;

    for (let i = 0; i < Object.keys(personalityJSON.questions).length; i++)
    {
        switch (personalityJSON.questionTypes[i + 1])
        {
            case "EXTR":
                cat1 -= responses[i];
                break;
            case "INTR":
                cat1 += responses[i];
                break;
            case "INTU":
                cat2 -= responses[i];
                break;
            case "SENS":
                cat2 += responses[i];
                break;
            case "FEEL": 
                cat3 -= responses[i];
                break;
            case "THIN":
                cat3 += responses[i];
                break;
            case "JUDG":
                cat4 -= responses[i];
                break;
            case "PERC":
                cat4 += responses[i];
                break;
            default:
                return '';
        }
    }

    // build personality string
    let personalityType = ''
    if (cat1 >= 0) personalityType += 'I';
    else personalityType += 'E';

    if (cat2 >= 0) personalityType += 'S';
    else personalityType += 'N';
    
    if (cat3 >= 0) personalityType += 'T';
    else personalityType +='F';

    if (cat4 >= 0) personalityType += 'P';
    else personalityType += 'J';

    return personalityType;
};

const scoreDisc = () =>
{

};

const scoreFriendship = () =>
{

};

module.exports = { scorePersonality, scoreDisc, scoreFriendship };