const jose = require('jose');
const { createSecretKey } = require('crypto');
require('dotenv').config();

/**
 * Generate a JWT bearer token
 * 
 * @param {Object} body - information to be encoded
 * @returns {string} bearer token
 */
const generateJWT = (async (body) =>
{
    const secret = createSecretKey(process.env.JWT_SECRET, 'utf-8');
    return await new jose.SignJWT(body)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .sign(secret);
});

module.exports = { generateJWT };