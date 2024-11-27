const { DataTypes, Model } = require('sequelize');

class Artista extends Model {
  static init(sequelize) {
    return super.init({
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'artistas',
      timestamps: false,
    });
  }

  static associate(models) {
    Artista.hasMany(models.Album, {
      foreignKey: 'artistaId',
      as: 'albuns',
    });
    Artista.belongsToMany(models.Genero, {
      through: 'artista_genero',
      foreignKey: 'artistaId',
      as: 'generos',
      timestamps: false
    });
  }
}

module.exports = Artista;
