const { Schema, model } = require('mongoose');

const EditorialSchema = Schema({
    nombre: { 
        type: String,
        required: [true, 'Debe colocar un nombre'],

    },
    PaisOrigen: { 
        type: String,
        required: true

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

module.exports = model('Editorial', EditorialSchema );