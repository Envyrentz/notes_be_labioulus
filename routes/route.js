const express = require('express');
const router = express.Router();

const notes = require('../app/api/notepad');

router.use('/notes', notes);

module.exports = router;