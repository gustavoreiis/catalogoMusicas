module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('generos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      genero: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    });

    // Tabela intermediária para associação muitos-para-muitos
    await queryInterface.createTable('artista_genero', {
      artistaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'artistas',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      generoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'generos',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('artista_genero');
    await queryInterface.dropTable('generos');
  },
};
