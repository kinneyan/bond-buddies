const express = require('express');
const router = express.Router();


// get middleware
const { authenticate } = require('../middleware/auth');
const { removeFriend } = require('../controllers/removeFriend');
const { addFriend } = require('../controllers/addFriend');
const { searchFriend } = require('../controllers/searchFriend');

router.post('/remove', authenticate);
router.post('/remove', removeFriend);

router.post('/add', authenticate);
router.post('/add', addFriend);

router.post('/search', authenticate);
router.post('/search', searchFriend);

module.exports = router;