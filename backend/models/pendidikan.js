'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pendidikan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pendidikan.belongsTo(models.User, {
        foreignKey: "id_user"
      });
    }
  }
  Pendidikan.init({
    id_user: DataTypes.INTEGER,
    jenis_pendidikan: DataTypes.STRING,
    nama_institusi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pendidikan',
  });
  return Pendidikan;
};