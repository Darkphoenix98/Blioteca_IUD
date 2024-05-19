const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombres: { 
        type: String,
        required: [true, 'Debe colocar un nombre'],

    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    direccion:{
        type: String,
        required: true,
    },
    ocupacion:{
        type: String,
        required: true,
        enum: ['Estudiante','Profesor','Personal']
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

module.exports = model('Usuario', UsuarioSchema );