const { DataTypes } = require('sequelize');
const sequelize = require('../../connection_db');

const Categoria = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        default: ''
    }
}, {
    tableName: 'categoria',
    timestamps: false
});

module.exports = Categoria;