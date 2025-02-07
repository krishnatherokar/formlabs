const express = require('express');
const getForm = require('../controllers/form/getForm');
const router = express.Router();

router.get('/:id', getForm);

module.exports = router;