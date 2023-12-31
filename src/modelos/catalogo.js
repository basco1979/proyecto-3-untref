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
    categoria: {
        type: DataTypes.STRING,
        references: {
            model: 'categoria',
            key: 'id'
        }
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
        type: DataTypes.STRING,
        default: ''
    }
}, {
    tableName: 'catalogo',
    timestamps: false
});

module.exports = Catalogo;