'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //? Relationship
      Project.hasMany(models.ProjectImage, {
        as: 'images',
        foreignKey: 'projectId',
      });

      Project.belongsTo(models.Hire, {
        as: 'hire',
        foreignKey: 'hireId',
      });
      Project.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'UserId',
      });
    }
  }
  Project.init(
    {
      hireId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};
