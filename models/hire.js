'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //? Relationship
      Hire.belongsToMany(models.User, {
        through: 'Transaction',
        foreignKey: 'hireId',
        otherKey: 'orderByUserId',
        as: 'orderBy',
      });
      Hire.belongsToMany(models.User, {
        through: 'Transaction',
        foreignKey: 'hireId',
        otherKey: 'orderToUserId',
        as: 'orderTo',
      });
      Hire.hasOne(models.Project, {
        as: 'project',
        foreignKey: 'hireId',
      });
    }
  }
  Hire.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      started: DataTypes.DATE,
      finished: DataTypes.DATE,
      price: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Hire',
    }
  );
  return Hire;
};
