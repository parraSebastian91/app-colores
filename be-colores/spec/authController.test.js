const authController = require('../src/controller/authController')

const userAdmin = {
    usuario: 'administrador',
    password: 'asd123'
}

const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJhZG1pbmlzdHJhZG9yIGFkbWluIiwidGlwbyI6IkFETUlOSVNUUkFET1IiLCJpYXQiOjE2MTgyMzc2MzN9.FTp0gN5YSqDRLwIo2qUpkz6z8lIduPnm5YBLCGG_ydQ";

test('Crear Token', async () => {
    const item = await authController.createToken(userAdmin);
    expect(item).toHaveProperty('token');
    expect(item).toHaveProperty('cod');
});

test('Valida Token', async () => {
    const item = authController.validarToken(Token);
    expect(item).toBe(true);
})

test('decode Token', async () => {
    const item = authController.decodeToken(Token);
    expect(item).toHaveProperty('nombre');
    expect(item).toHaveProperty('tipo');
    expect(item).toHaveProperty('iat');
})