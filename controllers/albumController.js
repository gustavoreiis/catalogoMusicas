const sequelize = require('../config/config');
const { DataTypes } = require('sequelize');
const { Album, Artista, Musica } = require('../models');

exports.getAllAlbuns = async (req, res) => {
    try {
        const albuns = await Album.findAll({
          include: {
            model: Artista,
            as: 'artista',
            attributes: ['nome'], 
          },
        });
        res.render('album', { albuns });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

exports.getAlbumById = async (req, res) => {
    const { id } = req.params;
    try {
        const album = await Album.findByPk(id, {
            include: [
                {
                    model: Artista,
                    as: 'artista',
                    attributes: ['nome']
                },
                {
                    model: Musica,
                    as: 'musicas',
                    attributes: ['nome']
                }
            ]
        });
        if (!album) {
            return res.status(404).send('Álbum não encontrado');
        }
        res.render('albumInformacoes', { album });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.createAlbum = async (req, res) => {
    try {
        const { titulo, ano, capa, artistaId } = req.body;
        const novoAlbum = await albumModel.create({ titulo, ano, capa, artistaId });

        res.status(201).json(novoAlbum);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

exports.updateAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, ano, capa, artista } = req.body;
        const album = await albumModel.findByPk(id);

        if (album) {
            if (titulo != null) {
                album.titulo = titulo;
            }
            if (ano != null) {
                album.ano = ano;
            }
            if (artista != null) {
                album.artistaId = artista;
            }
            if (capa != null) {
                album.capa = capa;
            }
            await album.save();
            res.status(200).json(album);
        } else {
            res.status(404).json({ message: "Álbum não encontrado."});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const album = await albumModel.findByPk(id);

        if (album) {
            await album.destroy();
            res.status(204).json({ message: "Álbum deletado com sucesso." });
        } else {
            res.status(404).json({ message: "Álbum não encontrado."});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}