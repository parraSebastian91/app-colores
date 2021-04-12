const colorController = require('../src/controller/colorController')
const authController = require('../src/controller/authController')

const userAdmin = {
    usuario: 'administrador',
    password: 'asd123'
}

test('Crea Color', async () => {
    const color = {
        name: 'Prueba',
        color: '#fff',
        pantone: 'pantone',
        year: '1991'
    }
    const token = await authController.createToken(userAdmin);
    const item = await colorController.setColor(color);
    expect(item).toHaveProperty('msj');
    expect(item).toHaveProperty('obj');
    expect(item).toHaveProperty('cod');
});

test('actualiza Color', async () => {
    const color = {
        name: 'Prueba',
        color: '#fff',
        pantone: 'pantone',
        year: '1991'
    }
    const token = await authController.createToken(userAdmin);
    const item = await colorController.updColorById(color,1);
    expect(item).toHaveProperty('msj');
    expect(item).toHaveProperty('obj');
    expect(item).toHaveProperty('cod');
});

test('elimina Color', async () => {
    const token = await authController.createToken(userAdmin);
    const item = await colorController.updColorById(1);
    expect(item).toHaveProperty('msj');
    expect(item).toHaveProperty('obj');
    expect(item).toHaveProperty('cod');
});

test('getColor List', async () => {
    const req = { limite: 5, pagina: 1, doc: 'json' };
    const token = await authController.createToken(userAdmin);
    const item = await colorController.getListColores(req);
    expect(item).toHaveProperty('items');
    expect(item).toHaveProperty('pagination');
});

test('getColor by id', async () => {
    const token = await authController.createToken(userAdmin);
    const item = await colorController.getColorByID(1);
    expect(item).toHaveProperty('_id');
    expect(item).toHaveProperty('color');
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('pantone');
    expect(item).toHaveProperty('year');
});

