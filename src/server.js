/* eslint-disable no-unused-vars */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');

const sequelize = require('../connection_db');
const Catalogo = require('./routes/catalogo');
const Categoria = require('./routes/categoria');

const server = express();

// Middlewares
server.use(express.json());

// Rutas a Catalogo
server.use('/catalogo', Catalogo);

// Rutas a Categorias
server.use('/categorias', Categoria);

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send({ error: `La URL indicada no existe en este servidor` });
});

// Manejo de errores
server.use((err, req, res, next) => {
    console.log(err);
    res.send(err);
});


// Método oyente de solicitudes
sequelize.authenticate().then(() => {
    sequelize.sync({ force: false }).then(() => {
        server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
            console.log(`El servidor está escuchando en: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
        });
    }).catch(() => {
        console.log('Hubo un problema con la sincronización de los modelos.');
    });
}).catch(() => {
    console.log('Hubo un problema con la conexión a la base de datos.');
});

