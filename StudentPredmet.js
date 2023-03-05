let sequelize = require('sequelize');
let baza = require('./baza');

let StudentPredmet = baza.define('student_predmet', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = StudentPredmet;