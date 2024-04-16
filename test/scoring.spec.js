const { expect } = require('chai');
const { scoreTest, scorePersonality, scoreDisc, scoreFriendship } = require('../utils/scoring');

describe('Assessment scoring', () =>
{
    const neutral = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    describe('#scorePersonality()', () =>
    {
        it('Should return ISTP with all neutral responses', () => 
        {
            const actual = scorePersonality(neutral).type;
            const expected = 'ISTP';
            expect(actual).to.equal(expected);
        });
    });
    describe('#scoreDisc()', () => 
    {
        it('Should return Dominance with all neutral responses', () =>
        {
            const actual = scoreDisc(neutral).type;
            const expected = 'Dominance';
            expect(actual).to.equal(expected);
        });
    });
    describe('#scoreFriendship()', () =>
    {
        it('Should return Words of Affirmation with all neutral responses', () =>
        {
            const actual = scoreFriendship(neutral).type;
            const expected = 'Words of Affirmation';
            expect(actual).to.equal(expected);
        });
    });
    describe('#scoreTest()', () =>
    {
        it('Should return ISTP for a personality test with neutral responses', () => 
        {
            const actual = scoreTest('Personality', neutral).type;
            const expected = 'ISTP';
            expect(actual).to.equal(expected);
        });
        it('Should return Dominance for disc test with neutral responses', () =>
        {
            const actual = scoreTest('DISC', neutral).type;
            const expected = 'Dominance';
            expect(actual).to.equal(expected);
        });
        it('Should return Words of Affirmation for friendship test with neutral responses', () =>
        {
            const actual = scoreTest('Friendship', neutral).type;
            const expected = 'Words of Affirmation';
            expect(actual).to.equal(expected);
        })
    });
});