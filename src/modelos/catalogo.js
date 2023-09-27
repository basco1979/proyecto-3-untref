const { DataTypes } = require('sequelize');
const sequelize = require('../../connection_db');
const Categoria = require('./categoria');
const Genero = require('./genero');
const Genero_Catalogo = require('./genero_catalogo');

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
        type: DataTypes.INTEGER,
        default: ''
    }
}, {
    tableName: 'catalogo',
    timestamps: false
});

Catalogo.belongsTo(Categoria, {foreignKey: 'id'});

Catalogo.belongsToMany(Genero, { through: Genero_Catalogo });
Genero.belongsToMany(Catalogo, { through: Genero_Catalogo });


module.exports = Catalogo;