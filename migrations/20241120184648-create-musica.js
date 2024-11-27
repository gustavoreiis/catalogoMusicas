module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('musicas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'albuns',
          key: 'id',
        },
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('musicas');
  },
};