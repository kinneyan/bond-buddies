const { expect } =  require('chai');
const { sortUsers } = require('../utils/sortUsers');

describe('Users', () => 
{
    describe('#sortUsers()', () =>
    {
        it('Should flip order with larger number first', () =>
        {
            const actual = JSON.stringify(sortUsers('1', '0'));
            const expected = JSON.stringify(['0', '1']);
            expect(actual).to.equal(expected);
        });
        it('Should not change order with smaller number first in input', () =>
        {
            const actual = JSON.stringify(sortUsers('0', '1'));
            const expected = JSON.stringify(['0', '1']);
            expect(actual).to.equal(expected);
        });
    });
});