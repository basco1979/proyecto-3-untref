const { DataTypes } = require('sequelize');
const sequelize = require('../../connection_db');

const Genero_Catalogo = sequelize.define('Genero_Catalogo', {
    idCatalogo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    idGenero: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, { tableName: 'genero_catalogo', timestamps: false });


module.exports = Genero_Catalogo;