// Specify routes for the /user endpoint
// 
// Register - create a new user
// Login - login to an existing user

const express = require('express');
const router = express.Router();

const { register } = require('../controllers/register');

router.post('/register', register);

module.exports = router;