const express = require('express');
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const sequelize = require('./config/sequelize');
const musicaRoutes = require('./routes/musicaRoutes');
const albumRoutes = require('./routes/albumRoutes');
const artistaRoutes = require('./routes/artistaRoutes');
const generoRoutes = require('./routes/generoRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.use('/musicas', musicaRoutes);
app.use('/albuns', albumRoutes); 
app.use('/artistas', artistaRoutes); 
app.use('/generos', generoRoutes);
app.get('/', (req, res) => {
  res.render('inicio'); // Renderiza a página inicial
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sincronizando os modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
  })
  .catch(error => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
