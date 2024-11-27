const { DataTypes, Model } = require('sequelize');

class Album extends Model {
  static init(sequelize) {
    return super.init({
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ano: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      capa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artistaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Artistas', // Referência correta para a tabela Artistas
          key: 'id',
        },
      },
    }, {
      sequelize,
      tableName: 'albuns',
      timestamps: false,
    });
  }

  static associate(models) {
    // Relacionamento correto entre Album e Artista
    Album.belongsTo(models.Artista, { foreignKey: 'artistaId', as: 'artista' });
    
    // Adicionando a associação 'hasMany' entre Album e Musica
    Album.hasMany(models.Musica, {
      foreignKey: 'albumId',
      as: 'musicas', // Alias para acessar as músicas
    });
  }
}

module.exports = Album;
