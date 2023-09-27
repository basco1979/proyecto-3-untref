const { DataTypes } = require('sequelize');
const sequelize = require('../../connection_db');

const Actor = sequelize.define('Actor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    actor: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'actor',
    timestamps: false
});

module.exports = Actor;