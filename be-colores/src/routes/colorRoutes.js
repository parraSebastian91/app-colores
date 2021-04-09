var router = require('express').Router();
const Color = require('../models/models').color;
const colorController = require('../controller/colorController');


/**
 * Prueba de servicio
 */
router.get('/test', (req, res) => {
    res.send('prueba request item')
})

/**
 * Obntener Lista de colores
 */
router.get('', async (req, res) => {
    colorController.getListColores(req.query)
        .then(t => {
            res.send(t)
        }).catch(err => {
            res.send(t)
        });
})

/***
 * get color por ID
 */

router.get('/:id', async (req, res) => {
    const idItem = req.params.id;
    colorController.getColorByID(idItem).then(t => {
        res.send(t)
    }).catch(err => {
        res.send(t)
    });
});

/**
 * crear color
 */

router.post('', (req, res) => {
    const item = req.body;
    colorController.setColor(item)
        .then(t => {
            res.send(t)
        })
        .catch(err => {
            res.send(err)
        });
});

/**
 * Actualizar Color
 */

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    colorController.updColorById(body, id)
        .then(t => {
            res.send(t)
        })
        .catch(err => {
            res.send(err)
        });
});

/**
 * Elimina Color
 */

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    colorController.deleteColorById(id)
        .then(t => {
            res.send(t)
        })
        .catch(err => {
            res.send(err)
        });
});

module.exports = router