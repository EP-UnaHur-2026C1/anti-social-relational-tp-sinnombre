'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // user -> posts
    User.hasMany(models.Post, {
      foreignKey: "userId"
    });

    // user -> comments
    User.hasMany(models.Comment, {
      foreignKey: "userId"
    });

    // followers
    User.belongsToMany(models.User, {
      through: models.Follow,
      as: "Following",
      foreignKey: "followerId",
      otherKey: "followingId"
    });

    User.belongsToMany(models.User, {
      through: models.Follow,
      as: "Followers",
      foreignKey: "followingId",
      otherKey: "followerId"
    });
    }
  }
  User.init({
    nickName: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};