'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organisasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organisasi.belongsTo(models.User, {
        foreignKey: "id_user"
      });
    }
  }
  Organisasi.init({
    id_user: DataTypes.INTEGER,
    jabatan: DataTypes.STRING,
    nama_organisasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organisasi',
  });
  return Organisasi;
};