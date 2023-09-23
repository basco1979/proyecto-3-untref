const { DataTypes } = require('sequelize');
const sequelize = require('../../connection_db');

const Genero = sequelize.define('Genero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        default: ''
    }
}, {
    tableName: 'genero',
    timestamps: false
});

module.exports = Genero;