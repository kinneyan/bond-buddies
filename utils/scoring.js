const scoreTest = (test, responses) =>
{
    switch (test)
    {
        case 'Personality':
            return scorePersonality(responses);
        case 'DISC':
            return scoreDisc(responses);
        case 'Friendship':
            return scoreFriendship(responses);
        default:
            return '';
    }
}

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

const scoreDisc = (responses) =>
{
    const discJSON = require('../tests/disc.json');
    
    let d = 0;
    let i = 0; 
    let s = 0;
    let c = 0;

    for (let j = 0; j < Object.keys(discJSON.questions).length; j++)
    {
        switch (discJSON.questionTypes[j + 1])
        {
            case "D":
                d += responses[j];
                break;
            case "I":
                i += responses[j];
                break;
            case "S":
                s += responses[j];
                break;
            case "C": 
                c += responses[j];
                break;
            default: 
                return '';
        }
    }

    switch (Math.max(d, i, s, c))
    {
        case d:
            return 'D';
        case i:
            return 'I';
        case s:
            return 'S';
        case c:
            return 'C';
        default:
            return '';
    }
};

const scoreFriendship = (responses) =>
{

};

module.exports = { scoreTest };