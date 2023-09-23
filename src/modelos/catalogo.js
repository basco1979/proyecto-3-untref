const { DataTypes } = require('sequelize');
const sequelize = require('../../connection_db');

const Catalogo = sequelize.define('Catalogo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    poster: {
        type: DataTypes.STRING,
        default: ''
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resumen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    temporadas: {
        type: DataTypes.INTEGER,
        default: 0
    },
    trailer: {
        type: DataTypes.INTEGER,
        default: ''
    }
}, {
    tableName: 'catalogo',
    timestamps: false
});

module.exports = Catalogo;