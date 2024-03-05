const express = require('express');
const router = express.Router();

const { removeFriend } = require('../controllers/removeFriend');

// get middleware
const { authenticate } = require('../middleware/auth');

router.post('/remove', authenticate);
router.post('/remove', removeFriend);

module.exports = router;