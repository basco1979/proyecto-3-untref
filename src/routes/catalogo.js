/* eslint-disable new-cap */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition*/
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const sequelize = require('../../connection_db');
const {Catalogo, Genero_Catalogo, Actor, Reparto} = require('../modelos/index');

router.get('/', async (req, res, next) => {
    try {
        const catalogo = await sequelize.query('SELECT * FROM catalogoview', {type: sequelize.QueryTypes.SELECT});
        for (let cat of catalogo) {
            cat.poster = `http://${req.headers.host}${req.originalUrl.slice(0, req.originalUrl.length - 1)}${cat.poster}`;
        }
        res.status(200).send(catalogo);
    } catch (err) {
        res.status(500);
        next(err);
    }
});


router.get('/:id', async (req, res) => {
    const contenidoId = req.params.id;
    if (Number.isNaN(Number(contenidoId))) return res.status(400).send('El ID tiene que ser un numero');
    try {
        const contenido = await sequelize.query(`SELECT * FROM catalogoview WHERE id = ${contenidoId}`, {type: sequelize.QueryTypes.SELECT});
        if (contenido.length < 1) return res.status(404).send('Id no encontrado');
        for (let cat of contenido) {
            cat.poster = `http://${req.headers.host}/catalogo${cat.poster}`;
        }
        res.status(200).send(contenido);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/titulo/:titulo', async (req, res) => {
    const { titulo} = req.params;
    try {
        const catalogo = await sequelize.query(`SELECT * FROM catalogoview WHERE lower(titulo) LIKE lower('%${titulo}%')`, {type: sequelize.QueryTypes.SELECT});
        if (catalogo.length < 1) return res.status(400).send('Titulo no encontrado');
        for (let cat of catalogo) {
            cat.poster = `http://${req.headers.host}/catalogo${cat.poster}`;
        }
        res.status(200).send(catalogo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/genero/:genero', async (req, res) => {
    const { genero} = req.params;
    try {
        const catalogo = await sequelize.query(`SELECT * FROM catalogoview WHERE lower(genero) LIKE lower('%${genero}%')`, {type: sequelize.QueryTypes.SELECT});
        if (catalogo.length < 1) return res.status(400).send('Genero no encontrado');
        for (let cat of catalogo) {
            cat.poster = `http://${req.headers.host}/catalogo${cat.poster}`;
        }
        res.status(200).send(catalogo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/categoria/:categoria', async (req, res) => {
    const { categoria} = req.params;
    try {
        const catalogo =
        await sequelize.query(`SELECT * FROM catalogoview WHERE lower(categoria) LIKE lower('%${categoria}%')`, {type: sequelize.QueryTypes.SELECT});
        if (catalogo.length < 1) return res.status(400).send('Categoria no encontrada');
        for (let cat of catalogo) {
            cat.poster = `http://${req.headers.host}/catalogo${cat.poster}`;
        }
        res.status(200).send(catalogo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error en el servidor');
    }
});


router.post('/catalogo', async (req, res) => {
    const { titulo, poster, categoria, resumen, temporadas, trailer, genero, actor } = req.body;
    if (!titulo || !categoria || !poster || !resumen) {
        return res.status(400).send('Faltan datos relevantes');
    }
    try {
        const catalogo = {
            titulo,
            categoria: categoria === 'Serie' ? 1 : ('Pelicula' ? 2 : ''),
            poster,
            resumen,
            temporadas,
            trailer
        };
        await Catalogo.create(catalogo);
        const catalogoId = await sequelize.query(`SELECT id FROM catalogo WHERE titulo='${titulo}'`, {type: sequelize.QueryTypes.SELECT}).then((c) => c.map((cat) => cat.id));
        for (let gen of genero) {
            const generoId = await sequelize.query(`SELECT id FROM genero WHERE genero='${gen}'`, {type: sequelize.QueryTypes.SELECT}).then((g) => g.map((genID) => genID.id));
            const genero_catalogo = {
                idCatalogo: catalogoId,
                idGenero: generoId
            };
            Genero_Catalogo.create(genero_catalogo);
        }
        for (let act of actor) {
            const nombreActor = await Actor.findOne({ where: { actor: act}});
            console.log(nombreActor, act);
            if (nombreActor !== null) {
                const actorId = await sequelize.query(`SELECT id FROM actor WHERE actor='${act}'`, {type: sequelize.QueryTypes.SELECT}).then((a) => a.map((actID) => actID.id));
                const reparto = {
                    idCatalogo: catalogoId,
                    idActor: actorId
                };
                Reparto.create(reparto);
            } else {
                console.log(act);
                await sequelize.query(`insert into actor(actor) values('${act}');`);
                const actorId = await sequelize.query(`SELECT id FROM actor WHERE actor='${act}'`, {type: sequelize.QueryTypes.SELECT}).then((a) => a.map((actID) => actID.id));
                const reparto = {
                    idCatalogo: catalogoId,
                    idActor: actorId
                };
                Reparto.create(reparto);
            }
        }
        return res.status(201).send('Registro creado');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error en el servidor');
    }
});

router.put('/catalogo/:id', async(req, res) => {
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

router.delete('/catalogo/:id', async (req, res) => {
    try {
        const contenido = await Catalogo.findByPk(req.params.id);
        if (!contenido) return res.status(400).send('Id no encontrado');
        await Reparto.destroy({ where: { idCatalogo: req.params.id } });
        await Genero_Catalogo.destroy({ where: { idCatalogo: req.params.id } });
        await Catalogo.destroy({ where: { id: req.params.id } });
        res.status(200).send({
            message: `El producto de id: ${req.params.id} fue eliminado con éxito.`
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;