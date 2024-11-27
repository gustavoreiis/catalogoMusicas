const { DataTypes, Model } = require('sequelize');

class Musica extends Model {
  static init(sequelize) {
    return super.init({
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'albuns', // Nome da tabela relacionada
          key: 'id',
        },
      },
    }, {
      sequelize, // Passa a instância do Sequelize aqui
      tableName: 'musicas',
      timestamps: false,
    });
  }

  static associate(models) {
    // Relacionamento entre Musica e Album
    Musica.belongsTo(models.Album, {
      foreignKey: 'albumId',
      as: 'album', // Alias para acessar o álbum
    });
  }
}

module.exports = Musica;
