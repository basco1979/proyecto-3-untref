const Categoria = require('./categoria');
const Genero = require('./genero');
const Genero_Catalogo = require('./genero_catalogo');
const Catalogo = require('./catalogo');
const Actor = require('./actor');
const Reparto = require('./reparto');

Catalogo.belongsTo(Categoria, {foreignKey: 'id'});

Catalogo.belongsToMany(Genero, {
    through: {model: Genero_Catalogo },
    foreignKey: 'idCatalogo',
    otherKey: 'idGenero'
});

Genero.belongsToMany(Catalogo, {
    through: {model: Genero_Catalogo },
    foreignKey: 'idGenero',
    otherKey: 'idCatalogo'
});


Actor.belongsToMany(Catalogo, {
    through: {model: Reparto },
    foreignKey: 'idActor',
    otherKey: 'idCatalogo'
});

Catalogo.belongsToMany(Actor, {
    through: {model: Reparto },
    foreignKey: 'idCatalogo',
    otherKey: 'idActor'
});
module.exports = {Catalogo, Categoria, Genero, Genero_Catalogo, Actor, Reparto};