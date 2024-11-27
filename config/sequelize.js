const { Sequelize } = require('sequelize');

// Configuração do Sequelize para PostgreSQL
const sequelize = new Sequelize('postgres', 'postgres', '17268315', {
    host: 'localhost',
    dialect: 'postgres', // Dialeto definido
    logging: false, // Remove logs de consultas SQL (opcional)
});

module.exports = sequelize;
