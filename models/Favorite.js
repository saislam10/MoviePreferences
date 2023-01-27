const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Favorite extends Model {}
Favorite.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    movie_title: {
      type: DataTypes.STRING,
    },
    movie_poster: {
      type: DataTypes.STRING,
      defaultValue: 'http://www.placeholder.com/500x700'
    },
    movie_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favorite',
  }
);
module.exports = Favorite;