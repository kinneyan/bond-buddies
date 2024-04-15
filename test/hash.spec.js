const { expect } = require('chai');
const { shaHash } = require('../utils/hash');

describe('Hashing', () =>
{
    describe('#shaHash()', () => 
    {
        it('Hash should match a SHA256 hashed base64 string of the input text', () =>
        {
            const actual = shaHash('password');
            const expected = 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=';
            expect(actual).to.equal(expected);
        })
    });
});