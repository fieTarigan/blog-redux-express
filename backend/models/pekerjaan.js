'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pekerjaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pekerjaan.belongsTo(models.User, {
        foreignKey: "id_user"
      });
    }
  }
  Pekerjaan.init({
    id_user: DataTypes.INTEGER,
    nama_pekerjaan: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pekerjaan',
  });
  return Pekerjaan;
};