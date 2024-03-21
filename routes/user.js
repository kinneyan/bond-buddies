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

router.post('/register', register);
router.post('/login', login);

router.post('/update', authenticate);
router.post('/update', update);

router.get('/self', authenticate);
router.get('/self', getUser);

module.exports = router;