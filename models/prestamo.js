const { Schema, model } = require('mongoose');


const PrestamoSchema= Schema({
  
    fecha_Prestamo:{
        type:Date,
        required:true
    },
    fecha_Devolucion:{
        type:Date,
        required:true
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
    ejemplar: {
        type: Schema.Types.ObjectId,
        ref: 'Ejemplar',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },


});

module.exports = model('Prestamo',PrestamoSchema );