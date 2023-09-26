const { DataTypes } = require('sequelize');
const sequelize = require('../../connection_db');
const Actor = require('./actor');
const Catalogo = require('./catalogo');

const Reparto = sequelize.define('Reparto', {
    idCatalogo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    iActor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, { tableName: 'reparto', timestamps: false });
Actor.belongsToMany(Catalogo, { through: Reparto });
Catalogo.belongsToMany(Actor, { through: Reparto });

module.exports = Reparto;