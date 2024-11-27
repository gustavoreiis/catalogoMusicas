const { DataTypes, Model } = require('sequelize');

class Genero extends Model {
  static init(sequelize) {
    return super.init({
      genero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize, // Passa a instância do Sequelize
      tableName: 'generos',
      timestamps: false,
    });
  }

  static associate(models) {
    Genero.belongsToMany(models.Artista, {
      through: 'artista_genero',
      foreignKey: 'generoId',
      as: 'artistas',
      timestamps: false
    });
  }
}

module.exports = Genero;
