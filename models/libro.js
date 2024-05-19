const { Schema, model } = require('mongoose');


const libroSchema = Schema({
    serial: {   
        type: String,
        required: [true, 'Debe colocar un Titulo'],
        unique: true
    },
    titulo:{
        type:String,
        required:true,
        
    },
    ISBN:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    imagen:{
        type:String,
        required:true,
        unique: true

    }, 
    fecha_publicacion:{
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
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Autor',
        required: true
     },
     editorial: {
        type: Schema.Types.ObjectId,
        ref: 'Editorial',
        required: true
     }

});

module.exports = model('Libro', libroSchema);


