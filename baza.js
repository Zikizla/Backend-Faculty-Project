let sequelize = require('sequelize');

let baza = new sequelize('bwt22P179-st', 'root', 'password', {
   host: 'localhost',
   dialect: 'mysql',
   logging: false
});

module.exports = baza;