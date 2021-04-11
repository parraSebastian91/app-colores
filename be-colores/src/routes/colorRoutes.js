const router = require('express').Router();
const Color = require('../models/models').color;
const colorController = require('../controller/colorController');

/**
 * @swagger
 * /colores:
 *   get:
 *     summary: Obtiene lista de colores.
 *     description: Se obtiene una lista de colores ingresados en BD
 *     parameters:
 *       - in: query
 *         name: limite
 *         required: false
 *         description: cantidad de items por página.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pagina
 *         required: false
 *         description: pagina a consultar.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: doc
 *         required: false
 *         description: tipo de documento necesario json o xml, por defecto json.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna lista e colores
 */
router.get('', async (req, res) => {
    colorController.getListColores(req.query)
        .then(t => {
            if (req.query.doc === 'xml') {
                res.set('Content-Type', 'text/xml');
                res.send(t);
            } else {
                res.send(t);
            }
        }).catch(err => {
            res.send(err)
        });
})

/**
 * @swagger
 * /colores/{id}:
 *   get:
 *     summary: busqueda de color.
 *     description: Se obtiene el color segun id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: identificador de color.
 *         schema:
 *           type: integer     
 *     responses:
 *       200:
 *         description: Retorna lista e colores
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
 * @swagger
 * /colores:
 *   post:
 *     summary: Creacion de nuevo color.
 *     description: Se crea color nuevo en base de datos.
 *     parameters:    
 *       - in: body
 *         name: usuario
 *         required: true
 *         description: Nombre de usuario.
 *         schema:
 *           type: string 
 *           required:
 *            - name
 *            - color
 *            - pantone
 *            - year
 *           properties:
 *             name:
 *               type: string
 *             color:
 *               type: string   
 *             pantone:
 *               type: string 
 *             year:
 *               type: string      
 *     responses:
 *       200:
 *         description: Retorna token de autorizacion.
 *       401: 
 *         description: Usted no tiene credenciales vigentes.
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
 * @swagger
 * /colores/{id}:
 *   put:
 *     summary: Actualizacion de color.
 *     description: Se actualiza comor según id y body request.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: identificador de color.
 *         schema:
 *           type: integer     
 *       - in: body
 *         name: name
 *         required: true
 *         description: Nombre del color a ingresar.
 *         schema:
 *           type: string  
 *       - in: body
 *         name: color
 *         required: true
 *         description: color formato HEX.
 *         schema:
 *           type: string 
 *       - in: body
 *         name: pantone
 *         required: true
 *         description: Pantone.
 *         schema:
 *           type: string   
 *       - in: body
 *         name: year
 *         required: true
 *         description: Año de ingreso del color.
 *         schema:
 *           type: string       
 *     responses:
 *       200:
 *         description: Actualizacion exitosa
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
 * @swagger
 * /colores/{id}:
 *   delete:
 *     summary: Eliminación de color.
 *     description: Se elimina color de base de datos, segun id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: identificador de color.
 *         schema:
 *           type: integer          
 *     responses:
 *       200:
 *         description: Retorna lista e colores
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