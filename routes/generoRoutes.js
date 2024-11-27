const express = require('express');
const generoController = require('../controllers/generoController');
const router = express.Router();

router.get('/', generoController.getAllGeneros);
router.post('/', generoController.createGenero);

module.exports = router;