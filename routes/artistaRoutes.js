const express = require('express');
const artistaController = require('../controllers/artistaController');
const router = express.Router();

router.get('/', artistaController.getAllArtistas)
router.get('/:id', artistaController.getArtistaById);
router.post('/', artistaController.createArtista);
router.put('/:id', artistaController.updateArtista);
router.delete('/:id', artistaController.deleteArtista);

module.exports = router;
