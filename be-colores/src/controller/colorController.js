const Color = require('../models/models').color;
const xml = require('xml');

/**
 * @name getListColores
 * @returns Obtiene Lista de Colores
 */

const getListColores = async ({ limite = 5, pagina = 1, doc = 'json' }) => {
    const limit = parseInt(limite);
    const pag = parseInt(pagina);
    const resp = new Promise((resolve, reject) => {
        let obj = 0;
        Color.find()
            .skip(pag)
            .limit(limit)
            .sort('id')
            .then(t => {
                if (doc === 'xml') {
                    Color.count().then(t2 => {
                        const listaColores = [
                            {
                                pagination:
                                    [
                                        { pp: limit },
                                        { page: pag },
                                        { total: t2 }
                                    ]
                            },
                            {
                                listaColores: t.map(m => {
                                    return {
                                        color: [{ id: m.id },
                                        { name: m.name },
                                        { color: m.color },
                                        { pantone: m.pantone },
                                        { year: m.year },]
                                    }
                                })
                            }
                        ];
                        resolve(xml(listaColores));
                    });

                } else {
                    Color.count().then(t2 => {
                        const respuesta = {
                            pagination: {
                                pp: limit,
                                page: pag,
                                total: t2
                            },
                            items: t.map(m => {
                                return {
                                    id: m.id,
                                    name: m.name,
                                    color: m.color,
                                    pantone: m.pantone,
                                    year: m.year,
                                }
                            })
                        }
                        resolve(respuesta);
                    });
                }
            }).catch(err => {
                reject(err)
            });
    });
    return resp;
}

/**
 * @name getColorByID
 * @returns Obtiene un documento buscado por el id
 */

const getColorByID = (idItem, limit = 0, skip = 0) => {
    const resp = new Promise((resolve, reject) => {
        Color.find({ id: idItem })
            .then(t => {
                resolve(t);
            }).catch(err => {
                reject(t);
            });
    });
    return resp;
}

/**
 * @name setColor
 * @returns Crea un documento tipo Color
 */

const setColor = async (item) => {
    const resp = new Promise(async (resolve, reject) => {
        const color = new Color({
            id: -1,
            name: item.name,
            color: item.color,
            pantone: item.pantone,
            year: item.year
        });
        const lastID = await getLastColorID();
        color.id = lastID + 1;
        color.save().then(t => {
            resolve({ msj: 'Color insertado correctamente', obj: t, cod: 200 })
        }).catch(err => {
            reject({ msj: 'Ha ocurrido un error en la inserción', obj: {}, cod: 500 })
        });
    });
    return resp;
}

/**
 * @name updColorById
 * @returns Actualiza documento por ID
 */

const updColorById = (item, id) => {
    const resp = new Promise(async (resolve, reject) => {
        const q = Color.where({ id: id });
        const colorUpd = {
            name: item.name,
            color: item.color,
            pantone: item.pantone,
            year: item.year
        }
        q.update({ $set: colorUpd }).exec()
            .then(t => {
                colorUpd.id = id;
                resolve({ msj: 'Color Actualizado correctamente', obj: colorUpd, cod: 200 })
            }).catch(err => {
                reject({ msj: 'Ha ocurrido un error en la actualizacion', obj: {}, cod: 500 })
            });
    });
    return resp;
}

/**
 * @name deleteColorById
 * @returns Actualiza documento por ID
 */

const deleteColorById = (id) => {
    const resp = new Promise(async (resolve, reject) => {
        const q = Color.deleteOne({ id });
        q.then(t => {
            resolve({ msj: 'Color Eliminado correctamente', cod: 200 })
        }).catch(err => {
            reject({ msj: 'Ha ocurrido un error en la actualizacion', cod: 500 })
        });
    });
    return resp;
}

/**
 * @name getLastColorID
 * @returns último id de base de datos
 */

const getLastColorID = () => {
    const lastID = new Promise((resolve, reject) => {
        Color.findOne().sort({ id: -1 })
            .then(t => resolve(t.id))
            .catch(() => reject(-1))
    })
    return lastID;
}

const colorMethod = {
    getListColores,
    getColorByID,
    setColor,
    updColorById,
    deleteColorById
}

module.exports = colorMethod
