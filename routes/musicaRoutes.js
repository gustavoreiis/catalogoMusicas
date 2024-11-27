const express = require('express');
const musicaController = require('../controllers/musicaController');
const router = express.Router();

router.get('/', musicaController.getAllMusicas)
router.get('/:id', musicaController.getMusicaById);
router.post('/', musicaController.createMusica);
router.put('/:id', musicaController.updateMusica);
router.delete('/:id', musicaController.deleteMusica);

module.exports = router;
