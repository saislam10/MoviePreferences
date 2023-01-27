// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Preferences extends Model {}

// Preferences.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     favorite_movies: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     favorite_genres: {
//       type: DataTypes.STRING,
//     },
//     favorite_actors: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//     allow_adult: {
//       type: DataTypes.BOOLEAN,
//       setDefaultValue: false
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'user',
//         key: 'id',
//       },
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'preferences',
//   }
// );

// module.exports = Preferences;