const { DataTypes } = require('sequelize');
const sequelize = require('../../connection_db'); // Importa la instancia de Sequelize

const VistaCatalogo = sequelize.define('catalogoview', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING
    },
    poster: {
        type: DataTypes.STRING
    },
    categoria: {
        type: DataTypes.STRING
    },
    genero: {
        type: DataTypes.STRING
    },
    resumen: {
        type: DataTypes.TEXT
    },
    temporadas: {
        type: DataTypes.INTEGER
    },
    reparto: {
        type: DataTypes.STRING
    },
    trailer: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'catalogoview',
    timestamps: false
});

module.exports = VistaCatalogo;
