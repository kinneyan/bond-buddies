// Specify routes for the /user endpoint
// 
// Register - create a new user
// Login - login to an existing user

const express = require('express');
const router = express.Router();

// get middlware
const { authenticate } = require('../middleware/auth');

// get endpoints
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');
const { update } = require('../controllers/updateUser');
const { getUser} = require('../controllers/getUser');
const { unblockUser} = require('../controllers/unblockUser');
const { blockUser} = require('../controllers/blockUser');
const { emailVerification } = require('../controllers/emailVerification');
const { verifyUser } = require('../controllers/verify');

router.post('/register', register);
router.post('/login', login);

router.post('/update', authenticate);
router.post('/update', update);

router.get('/self', authenticate);
router.get('/self', getUser);

router.post('/unblock', authenticate);
router.post('/unblock', unblockUser);
router.post('/block', authenticate);
router.post('/block', blockUser);

router.get('/verify', authenticate);
router.get('/verify', emailVerification);

router.get('/verifyUser', authenticate);
router.get('/verifyUser', verifyUser);

module.exports = router;