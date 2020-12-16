'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //? Relationship
      User.hasMany(models.Post, {
        as: 'posts',
      });
      User.hasMany(models.Hire, {
        as: 'orders',
        foreignKey: 'orderTo',
      });
      User.hasMany(models.Hire, {
        as: 'orderBy',
        foreignKey: 'orderBy',
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      fullname: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.STRING,
      greeting: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
