const express = require('express');
const router = express.Router();


// get middleware
const { authenticate } = require('../middleware/auth');
const { addFriend } = require('../controllers/addFriend');
const { searchFriends } = require('../controllers/searchFriends');
const { removeFriend } = require('../controllers/removeFriend');

router.post('/add', authenticate);
router.post('/add', addFriend);

router.post('/search', authenticate);
router.post('/search', searchFriends);

router.post('/remove', authenticate);
router.post('/remove', removeFriend);

module.exports = router;