const express = require('express');
const router = express.Router();

// get middleware
const { authenticate } = require('../middleware/auth');
const { updateAssessment } = require('../controllers/updateAssessments');

router.post('/update', authenticate);
router.post('/update', updateAssessment);

module.exports = router;