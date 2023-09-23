const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');

const sequelize = require('../connection_db');
const Catalogo = require('./modelos/catalogo');
const Categoria = require('./modelos/categoria');

const server = express();

// Middlewares
server.use(express.json());

server.get('/catalogo', async (req, res) => {
    console.log(req.headers);
    const catalogo = await sequelize.query('SELECT * FROM catalogoview', {type: sequelize.QueryTypes.SELECT});
    for (let cat of catalogo) {
        cat.poster = `http://${req.headers.host}${req.originalUrl.slice(0, req.originalUrl.length - 1)}${cat.poster}`;
    }
    res.status(200).send(catalogo);
});

server.get('/catalogo/:id', async (req, res) => {
    const contenidoId = req.params.id;
    const contenido = await sequelize.query(`SELECT * FROM catalogoview WHERE id = ${contenidoId}`, {type: sequelize.QueryTypes.SELECT});
    for (let cat of contenido) {
        cat.poster = `http://${req.headers.host}/catalogo${cat.poster}`;
    }
    res.status(200).send(contenido);
});

server.get('/catalogo/titulo/:titulo', async (req, res) => {
    const { titulo} = req.params;
    const catalogo = await sequelize.query(`SELECT * FROM catalogoview WHERE titulo='${titulo}'`, {type: sequelize.QueryTypes.SELECT});
    for (let cat of catalogo) {
        cat.poster = `http://${req.headers.host}/catalogo${cat.poster}`;
    }
    res.status(200).send(catalogo);
});

server.get('/catalogo/genero/:genero', async (req, res) => {
    const { genero} = req.params;
    const catalogo = await sequelize.query(`SELECT * FROM catalogoview WHERE genero LIKE'%${genero}%'`, {type: sequelize.QueryTypes.SELECT});
    for (let cat of catalogo) {
        cat.poster = `http://${req.headers.host}/catalogo${cat.poster}`;
    }
    res.status(200).send(catalogo);
});

server.get('/catalogo/categoria/:categoria', async (req, res) => {
    const { categoria} = req.params;
    const catalogo = await sequelize.query(`SELECT * FROM catalogoview WHERE categoria LIKE'%${categoria}%'`, {type: sequelize.QueryTypes.SELECT});
    for (let cat of catalogo) {
        cat.poster = `http://${req.headers.host}/catalogo${cat.poster}`;
    }
    res.status(200).send(catalogo);
});


server.get('/categorias', async (req, res) => {
    // const categoria = await sequelize.query('SELECT nombre FROM categoria', {type: sequelize.QueryTypes.SELECT});
    const categoria = await Categoria.findAll();
    res.status(200).send(categoria);
});


server.post('/catalogo', async (req, res) => {
    const newCatalogo = await Catalogo.create(req.body);
    res.status(201).send(newCatalogo);
});

server.put('/catalogo/:id', async (req, res) => {
    await Catalogo.update(req.body, {
        where: { id: req.params.id }
    });
    const catalogo = await Catalogo.findByPk(req.params.id);
    res.status(200).send(catalogo);
});

server.delete('/catalogo/:id', async (req, res) => {
    await Catalogo.destroy({ where: { id: req.params.id } });
    res.status(200).send({
        message: `El producto de id: ${req.params.id} fue eliminado con éxito.`
    });
});

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send({ error: `La URL indicada no existe en este servidor` });
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
    console.log('Hubo un problema con la conección a la base de datos.');
});

