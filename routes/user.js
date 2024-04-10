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
const { blockUser} = require('../controllers/blockUser');
const { similarUsers } = require('../controllers/similarUsers');

router.post('/register', register);
router.post('/login', login);

router.post('/update', authenticate);
router.post('/update', update);

router.get('/self', authenticate);
router.get('/self', getUser);

router.post('/block', authenticate);
router.post('/block', blockUser);

router.get('/similar', authenticate);
router.get('/similar', similarUsers);


module.exports = router;