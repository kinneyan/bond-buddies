const express = require('express');
const router = express.Router();

// get middleware
const { authenticate } = require('../middleware/auth');
const { updateAssessment } = require('../controllers/updateAssessments');
const { getResults } = require('../controllers/interpretResults');

router.post('/update', authenticate);
router.post('/update', updateAssessment);

router.get('/results', authenticate);
router.get('/results', getResults);

module.exports = router;