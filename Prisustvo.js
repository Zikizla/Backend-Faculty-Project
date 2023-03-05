let sequelize = require('sequelize');
let baza = require('./baza');

let Prisustvo = baza.define('prisustvo', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Prisustvo;