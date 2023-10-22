'use strict';
const {
  Model, Op
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Posting, {
        foreignKey: "id_user"
      });
      User.hasMany(models.Pekerjaan, {
        foreignKey: "id_user"
      });
      User.hasMany(models.Pendidikan, {
        foreignKey: "id_user"
      });
      User.hasMany(models.Organisasi, {
        foreignKey: "id_user"
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          message: "Username cannot be empty."
        },
        isUnique: function (value, next) {
          User.findOne({
            where: {
              username: value,
              id: {[Op.ne]: this.id}
            }
          }).then((result) => {
            if (result === null) {
              return next();
            } else {
              return next('Choose another email. This email already in use.');
            }
          }).catch((error) => {
            return next();
          })
        }
      }
    },
    password: DataTypes.STRING,
    foto: DataTypes.STRING,
    alamat: DataTypes.STRING
  }, {
    hooks: {
      beforeValidate: (user, options) => {
        if (user.foto === '' || user.foto === null || user.foto === undefined) {
          user.foto = "https://cdn.icon-icons.com/icons2/1812/PNG/96/4213460-account-avatar-head-person-profile-user_115386.png";
        }
      },
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(String(user.password), 5);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};