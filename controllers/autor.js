const { request, response } = require('express');
const Autor = require('../models/autor');


// crear
const CreateAutor = async (req, res) => {
    try {
        const {nombres, PaisOrigen } = req.body;

        // Verificar si el cliente existe ya existe
        const autorBD = await Autor.findOne({ nombres });
        if (autorBD) {
            return res.status(400).json({ msg: 'Ya existe el Autor' });
        }
        // Agregar 
        const datos = {
            nombres, 
            PaisOrigen
        };

        // Crear instancia del cliente con los datos
        const autor = new Autor(datos);

        // Guardar el cliente en la base de datos
        await autor.save();

        // Retornar la respuesta con el objeto cliente creado
        return res.status(201).json(autor);
    } catch (e) {
        // Manejar errores
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};


 
// consultar todos
const getAutores= async (req, res = response) => {
    try{
        const autorBD = await Autor.find()
        return res.json(autorBD);
    }catch(e){  
        return res.status(500).json({mjs: e})
    }

}

/**
 * Consultar por ID
 */
const getAutorPorID = async (req = request, res = response) => {
    try{
        const { id }  = req.params;
        const query = { _id: id };
        const autor = await Autor.findOne(query);
        return res.json(autor);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}

/**
 * Actualiza por ID
 */
const UpdateAutorPorId = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date()
        const autor = await Autor.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(autor);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}  



module.exports = {
    
    CreateAutor,
    getAutores,
    getAutorPorID,
    UpdateAutorPorId


} 