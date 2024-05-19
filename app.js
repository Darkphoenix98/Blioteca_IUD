const express = require('express');


const app = express();
const {  mongoConn } = require('./databases/configuration');
mongoConn()

const cors = require('cors');

const Autores = require('./routes/autor');
const Editoriales = require('./routes/editorial');
const Ejemplares = require('./routes/ejemplar');
const Libros = require('./routes/libro');
const Usuarios = require('./routes/usuario');
const Prestamos = require('./routes/prestamo');



//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use('/autores',Autores);
app.use('/editoriales', Editoriales);
app.use('/ejemplares', Ejemplares);
app.use('/libros', Libros);
app.use('/usuarios', Usuarios);
app.use('/prestamos', Prestamos);

module.exports = app;