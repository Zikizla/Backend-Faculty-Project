let sequelize = require('sequelize');
let baza = require('./baza');

let Student = baza.define('student', {
   id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   ime: {
      type: sequelize.STRING,
   },
   prezime: {
      type: sequelize.STRING
   },
   index: {
      type: sequelize.STRING,
      unique: true
   }
}, {
   freezeTableName: true,
   timestamps: false
});

module.exports = Student;