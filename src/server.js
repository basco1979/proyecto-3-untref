/* eslint-disable max-len */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');

const sequelize = require('../connection_db');
const Catalogo = require('./modelos/catalogo');
const Categoria = require('./modelos/categoria');
const Genero_Catalogo = require('./modelos/genero_catalogo');

const server = express();

// Middlewares
server.use(express.json());

server.get('/catalogo', async (req, res) => {
    const catalogo = await sequelize.query('SELECT * FROM catalogoview', {type: sequelize.QueryTypes.SELECT});
    for (let cat of catalogo) {
        cat.poster = `http://${req.headers.host}${req.originalUrl.slice(0, req.originalUrl.length - 1)}${cat.poster}`;
    }
    res.status(200).send(catalogo);
});

server.get('/catalogo/:id', async (req, res) => {
    const contenidoId = req.params.id;
    try {
        const contenido = await sequelize.query(`SELECT * FROM catalogoview WHERE id = ${contenidoId}`, {type: sequelize.QueryTypes.SELECT});
        if (contenido.length < 1) return res.status(400).send('Id no encontrado');
        for (let cat of contenido) {
            cat.poster = `http://${req.headers.host}/catalogo${cat.poster}`;
        }
        res.status(200).send(contenido);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error en el servidor');
    }
});

server.get('/catalogo/titulo/:titulo', async (req, res) => {
    const { titulo} = req.params;
    const catalogo = await sequelize.query(`SELECT * FROM catalogoview WHERE titulo LIKE '%${titulo}%'`, {type: sequelize.QueryTypes.SELECT});
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
    const { titulo, poster, resumen, temporadas, trailer, genero } = req.body;
    if (!titulo || !poster || !resumen || !temporadas || !trailer) return res.status(400).send('Faltan datos relevantes');
    try {
        const catalogo = {
            titulo,
            poster,
            resumen,
            temporadas,
            trailer
        };
        await Catalogo.create(catalogo);
        const generoId = await sequelize.query(`SELECT id FROM genero WHERE genero='${genero}'`, {type: sequelize.QueryTypes.SELECT}).then((g) => g.map((gen) => gen.id));
        const catalogoId = await sequelize.query(`SELECT id FROM catalogo WHERE titulo='${titulo}'`, {type: sequelize.QueryTypes.SELECT}).then((c) => c.map((cat) => cat.id));
        const genero_catalogo = {
            idCatalogo: catalogoId,
            idGenero: generoId
        };
        // await sequelize.query(`INSERT INTO genero_catalogo(idCatalogo,idGenero) values(${catalogoId.map((x) => x.id)}, ${generoId.map((x) => x.id)});`);
        await Genero_Catalogo.create(genero_catalogo);
        return res.status(201).send('Registro creado');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error en el servidor');
    }
});

server.put('/catalogo/:id', async (req, res) => {
    const { titulo, poster, resumen, temporadas, trailer } = req.body;
    if (!titulo && !poster && !resumen && !temporadas && !trailer) return res.status(400).send('Faltan datos relevantes');
    try {
        const contenido = await Catalogo.findByPk(req.params.id);
        if (!contenido) return res.status(400).send('Id no encontrado');
        if (titulo) contenido.titulo = titulo;
        if (poster) contenido.poster = poster;
        if (resumen) contenido.resumen = resumen;
        if (temporadas) contenido.temporadas = temporadas;
        if (trailer) contenido.trailer = trailer;
        await Catalogo.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(200).send(JSON.stringify({ message: 'Registro actualizado'}));
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error en el servidor');
    }
});

server.delete('/catalogo/:id', async (req, res) => {
    try {
        const contenido = await Catalogo.findByPk(req.params.id);
        if (!contenido) return res.status(400).send('Id no encontrado');
        await Catalogo.destroy({ where: { id: req.params.id } });
        res.status(200).send({
            message: `El producto de id: ${req.params.id} fue eliminado con éxito.`
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error en el servidor');
    }
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
    console.log('Hubo un problema con la conexión a la base de datos.');
});

