const { request, response } = require('express');
const Editorial = require('../models/editorial');



// crear
const CreateEditorial = async (req, res) => {
    try {
        const {nombre, PaisOrigen } = req.body;

        // Verificar si el cliente existe ya existe
        const editorialBD = await Editorial.findOne({ nombre });
        if (editorialBD) {
            return res.status(400).json({ msg: 'Ya existe el Editorial' });
        }
        // Agregar 
        const datos = {
            nombre, 
            PaisOrigen   
        };

        // Crear instancia del cliente con los datos
        const editorial = new Editorial(datos);
 
        // Guardar el cliente en la base de datos
        await editorial.save();

        // Retornar la respuesta con el objeto cliente creado
        return res.status(201).json(editorial);
    } catch (e) {
        // Manejar errores
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};


 
// consultar todos
const getEditoriales = async (req, res = response) => {
    try{
        const editorialBD = await Editorial.find()
        return res.json(editorialBD);
    }catch(e){  
        return res.status(500).json({mjs: e})
    }

}

/**
 * Consultar por ID
 */
const getEditorialPorID = async (req = request, res = response) => {
    try{
        const { id }  = req.params;
        const query = { _id: id };
        const editorial = await Editorial.findOne(query);
        return res.json(editorial);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}

/**
 * Actualiza por ID
 */
const UpdateEditorialPorId = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date()
        const editorial = await Editorial.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(editorial);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}



module.exports = {
    
    CreateEditorial,
    getEditoriales,
    getEditorialPorID,
    UpdateEditorialPorId


} 