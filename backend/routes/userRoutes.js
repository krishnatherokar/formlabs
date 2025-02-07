const express = require('express');
const getProfile = require('../controllers/profile/getProfile');
const isLogged = require('../middlewares/isLogged');
const editProfile = require('../controllers/profile/editProfile');
const router = express.Router();

router.use(isLogged);

router.get('/', getProfile);
router.post('/edit', editProfile);

module.exports = router;