'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
   // post -> user
    Post.belongsTo(models.User, {
      foreignKey: "userId"
    });

    // post -> comments
    Post.hasMany(models.Comment, {
      foreignKey: "postId"
    });

    // post -> images
    Post.hasMany(models.PostImage, {
      foreignKey: "postId"
    });

    // post -> tags
    Post.belongsToMany(models.Tag, {
      through: "PostTags",
      foreignKey: "postId"
    });
    }
  }
  Post.init({
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};