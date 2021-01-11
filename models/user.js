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
      ///? Relationship
      User.hasMany(models.Post, {
        as: 'posts',
        foreignKey: 'userId',
      });
      User.hasMany(models.Project, {
        as: 'projects',
        foreignKey: 'userId',
      });

      User.belongsToMany(models.User, {
        as: 'following',
        foreignKey: 'followerId',
        through: 'Follows',
      });
      User.belongsToMany(models.User, {
        as: 'followers',
        foreignKey: 'followingId',
        through: 'Follows',
      });
      User.belongsToMany(models.Hire, {
        through: 'Transaction',
        foreignKey: 'orderToUserId',
        as: 'orderTo',
      });
      User.belongsToMany(models.Hire, {
        through: 'Transaction',
        foreignKey: 'orderByUserId',
        as: 'orderBy',
      });

      User.hasMany(models.Art, {
        as: 'arts',
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullname: DataTypes.STRING,
      avatar: DataTypes.STRING,
      greeting: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
