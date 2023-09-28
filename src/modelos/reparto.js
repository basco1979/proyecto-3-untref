const { DataTypes } = require('sequelize');
const sequelize = require('../../connection_db');

const Reparto = sequelize.define('Reparto', {
    idCatalogo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    idActor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, { tableName: 'reparto', timestamps: false });

module.exports = Reparto;