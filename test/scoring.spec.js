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
        it('Should return conscientiousness with all neutral responses', () =>
        {
            const actual = scoreDisc(neutral).type;
            const expected = 'Conscientiousness';
            expect(actual).to.equal(expected);
        });
    });
    describe('#scoreFriendship()', () =>
    {
        it('Should return Acts of Service with all neutral responses', () =>
        {
            const actual = scoreFriendship(neutral).type;
            const expected = 'Acts of Service';
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
        it('Should return conscientiousness for disc test with neutral responses', () =>
        {
            const actual = scoreTest('DISC', neutral).type;
            const expected = 'Conscientiousness';
            expect(actual).to.equal(expected);
        });
        it('Should return Acts of Service for friendship test with neutral responses', () =>
        {
            const actual = scoreTest('Friendship', neutral).type;
            const expected = 'Acts of Service';
            expect(actual).to.equal(expected);
        })
    });
});