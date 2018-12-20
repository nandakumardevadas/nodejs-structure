'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_users = sequelize.define('tbl_users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING
  }, {});
  tbl_users.associate = function(models) {
    // associations can be defined here
  };
  return tbl_users;
};