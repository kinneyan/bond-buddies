const express = require('express');
const router = express.Router();

const { removeFriend } = require('../controllers/removeFriend');

// get middleware
const { authenticate } = require('../middleware/auth');
const { addFriend } = require('../controllers/addFriend');

router.post('/remove', authenticate);
router.post('/remove', removeFriend);

router.post('/add', authenticate);
router.post('/add', addFriend);

module.exports = router;