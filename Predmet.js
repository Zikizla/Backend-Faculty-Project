let sequelize = require('sequelize');
let baza = require('./baza');

let Predmet = baza.define('predmet', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    naziv: {
        type: sequelize.STRING
    },
    kod: {
        type: sequelize.STRING,
        unique: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Predmet;