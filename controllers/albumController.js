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

// Mostrar o formulário de criação de álbum
exports.showCreateAlbumForm = async (req, res) => {
    try {
        // Buscar todos os artistas para preencher o select no formulário de criação de álbum
        const artistas = await Artista.findAll();
        res.render('criarAlbum', { artistas });
    } catch (error) {
        res.status(500).send('Erro ao carregar artistas');
    }
};

// Criar novo álbum
exports.createAlbum = async (req, res) => {
    const { titulo, ano, capa, artistaId } = req.body;

    try {
        // Criar o álbum com os dados recebidos
        const novoAlbum = await Album.create({ 
            titulo, 
            ano, 
            capa, 
            artistaId 
        });

        // Após criar o álbum, redirecionar para a página de detalhes do álbum
        res.redirect(`/albuns/${novoAlbum.id}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, ano, capa, artista } = req.body;
        const album = await Album.findByPk(id);

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
            res.status(404).json({ message: "Álbum não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const album = await Album.findByPk(id);

        if (album) {
            await album.destroy();
            res.status(204).json({ message: "Álbum deletado com sucesso." });
        } else {
            res.status(404).json({ message: "Álbum não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
