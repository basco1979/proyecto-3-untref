/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const {Categoria} = require('../modelos/index');


router.get('/', async (req, res) => {
    const categoria = await Categoria.findAll();
    res.status(200).send(categoria);
});

module.exports = router;