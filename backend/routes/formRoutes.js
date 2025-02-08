const express = require('express');
const getForm = require('../controllers/form/getForm');
const formRouter = express.Router();

formRouter.get('/:id', getForm);

module.exports = formRouter;