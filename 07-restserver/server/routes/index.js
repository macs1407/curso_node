const express = require('express');
const app = express();

// Peticiones a usuario
app.use(require('./usuario'));
// Peticiones a login
app.use(require('./login'));
// Peticiones categorias
app.use(require('./categoria'));
// Peticiones productos
app.use(require('./producto'));
// Subir archivo
app.use(require('./upload'));
// Peticion para mostrar imagenes
app.use(require('./imagen'));

module.exports = app;