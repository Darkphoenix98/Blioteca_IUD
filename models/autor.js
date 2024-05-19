const { Schema, model } = require('mongoose');

const AutorSchema = Schema({
    nombres: {
        type: String,
        uniuqe: true,
        required: [true, 'Debe colocar un nombre'],
       
    },
    PaisOrigen:{
        type: String,
        required: true, 
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }


});

module.exports = model('Autor', AutorSchema);