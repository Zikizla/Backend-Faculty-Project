let sequelize = require('sequelize');
let baza = require('./baza');

let Cas = baza.define('cas', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    redniBroj: {
        type: sequelize.INTEGER
    },
    tip: {
        type: sequelize.STRING
    },
    sedmica: {
        type: sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Cas;