const { DataTypes } = require('sequelize');
const sequelize = require('../../connection_db');
const Genero = require('./genero');
const Catalogo = require('./catalogo');

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
Genero.belongsToMany(Catalogo, { through: Genero_Catalogo });
Catalogo.belongsToMany(Genero, { through: Genero_Catalogo });

module.exports = Genero_Catalogo;