const { Schema, model } = require('mongoose');

const EjemplarSchema= Schema({
   
    ubicacion: {
        type:String,
        required: [true, 'Debe colocar una ubiación'],

    },

    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },

     // resto de atributos fk
     libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: true
    }

});

module.exports = model('Ejemplar', EjemplarSchema );