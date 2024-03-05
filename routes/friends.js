const express = require('express');
const router = express.Router();

const { removeFriend } = require('../controllers/removeFriend');

router.post('/remove', removeFriend);

module.exports = router;