module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('albuns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      capa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      artistaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'artistas',
          key: 'id',
        },
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('albuns');
  },
};
