const express = require('express');
const albumController = require('../controllers/albumController');
const router = express.Router();

router.get('/', albumController.getAllAlbuns);
router.get('/criar', albumController.showCreateAlbumForm);
router.get('/:id', albumController.getAlbumById);
router.post('/', albumController.createAlbum);
router.put('/:id', albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);
router.post('/:id/musicas', albumController.addMusicaToAlbum);

module.exports = router;
