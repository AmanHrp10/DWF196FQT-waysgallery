'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //? relationship
      Photos.belongsTo(models.Post, {
        as: 'post',
        foreignKey: 'postId',
      });
    }
  }
  Photos.init(
    {
      image: DataTypes.STRING,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Photos',
    }
  );
  return Photos;
};
