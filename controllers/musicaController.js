const sequelize = require('../config/config');
const { DataTypes } = require('sequelize');
const { Musica, Album, Artista } = require('../models');


exports.getAllMusicas = async (req, res) => {
    try {
        const musicas = await Musica.findAll({
          include: [
            {
              model: Album,
              as: 'album',
              attributes: ['titulo', 'capa'],
              include: {
                model: Artista,
                as: 'artista',
                attributes: ['nome'],
              },
            },
          ],
        });
    
        res.render('musica', { musicas });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

exports.createMusica = async (req, res) => {
    try {
        const { nome, albumId } = req.body;  

        const novaMusica = await musicaModel.create({ nome, albumId });
        res.status(201).json(novaMusica);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getMusicaById = async (req, res) => {
    try {
        const { id } = req.params;
        const musica = await musicaModel.findByPk(id);
        if (musica) {
            res.status(200).json(musica);
        } else {
            res.status(404).json({ message: "Música não encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateMusica = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, albumId } = req.body;
        const musica = await musicaModel.findByPk(id);
        if (musica) {
            if (nome != null) {
                musica.nome = nome;
            }
            if (albumId != null) {
                musica.albumId = albumId;
            }
            await musica.save();
            res.status(200).json(musica);
        } else {
            res.status(404).json({ message: "Música não encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteMusica = async (req, res) => {
    try {
        const { id } = req.params;
        const musica = await musicaModel.findByPk(id);
        if (musica) {
            await musica.destroy();
            res.status(204).json({ message: "Música deletada com sucesso." });
        } else {
            res.status(404).json({ message: "Música não encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}