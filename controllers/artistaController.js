const sequelize = require('../config/config');
const { DataTypes } = require('sequelize');
const { Artista, Album, Genero } = require('../models');

exports.getAllArtistas = async (req, res) => {
    try {
        const artistas = await Artista.findAll();
        const generos = await Genero.findAll();
        res.render('artista', {artistas, generos})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createArtista = async (req, res) => {
    try {
        const { nome, generos } = req.body;
        const novoArtista = await Artista.create({ nome });
        if (generos && generos.length > 0) {
            await novoArtista.setGeneros(generos);  // `generos` deve ser um array de IDs
        }
        res.redirect(`/artistas/${novoArtista.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


exports.getArtistaById = async (req, res) => {
    try {
        const { id } = req.params;
        const artista = await Artista.findByPk(id, {
            include: [
                {
                    model: Genero,
                    as: 'generos',
                    attributes: ['id', 'genero']
                },
                {
                    model: Album,
                    as: 'albuns',
                    attributes: ['id', 'titulo', 'capa', 'ano']
                }
            ]
        });
        if (artista) {
            res.render('artistaInformacoes', { artista })
        } else {
            res.status(404).json({ message: "Artista não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateArtista = async (req, res) => {
    const artistaId = req.params.id;
  const { nome } = req.body;

  try {
    const artista = await Artista.findByPk(artistaId);

    if (!artista) {
      return res.status(404).send('Artista não encontrado');
    }
    artista.nome = nome;
    await artista.save();
    res.redirect(`/artistas/${artistaId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar artista');
  }
}

exports.deleteArtista = async (req, res) => {
    try {
        const { id } = req.params;
        const artista = await Artista.findByPk(id);
        
        if (artista) {
            await artista.destroy();
            res.redirect('/artistas');
        } else {
            res.status(404).json({ message: "Artista não encontrado." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
