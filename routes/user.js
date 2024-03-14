// Specify routes for the /user endpoint
// 
// Register - create a new user
// Login - login to an existing user

const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth');
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');
const { getUser} = require('../controllers/getUser');

router.post('/register', register);
router.post('/login', login);

router.get('/self', authenticate);
router.get('/self', getUser);

module.exports = router;