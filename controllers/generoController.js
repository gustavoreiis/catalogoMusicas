const generoModel = require('../models/genero')

exports.createGenero = async (req, res) => {
    try {
        const { genero } = req.body;  
        const novoGenero = await generoModel.create({ genero });
        res.status(201).json(novoGenero);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllGeneros = async (req, res) => {
    try {
        const generos = await generoModel.findAll();
        res.status(200).json(artistas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

