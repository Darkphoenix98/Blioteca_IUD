const { request, response } = require('express');
const Usuario = require('../models/usuario');

// crear
const CreateUsuario = async (req, res) => {
    try {
        const {nombres, email, direccion,ocupacion} = req.body;

        // Verificar si el cliente existe ya existe
        const usuarioBD = await Usuario.findOne({ nombres });
        if (usuarioBD) {
            return res.status(400).json({ msg: 'Ya existe el Usuario' });
        }
        // Agregar 
        const datos = {
            nombres,email,direccion, ocupacion
        };

        // Crear instancia del cliente con los datos
        const  usuario = new Usuario(datos);

        // Guardar el cliente en la base de datos
        await usuario.save();

        // Retornar la respuesta con el objeto cliente creado
        return res.status(201).json(usuario);
    } catch (e) {
        // Manejar errores
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};


 
// consultar todos
const getUsuarios= async (req, res = response) => {
    try{
        const usuarioBD = await Usuario.find()
        return res.json(usuarioBD);
    }catch(e){
        return res.status(500).json({mjs: e})
    }

}

/**
 * Consultar por ID
 */
const getUsuarioPorID = async (req = request, res = response) => {
    try{
        const { id }  = req.params;
        const query = { _id: id };
        const usuario = await Usuario.findOne(query);
        return res.json(usuario);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}

/**
 * Actualiza por ID
 */
const UpdateUsuarioPorId = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date()
        const usuario = await Usuario.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(usuario);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}



module.exports = {
    
    CreateUsuario,
    getUsuarios,
    getUsuarioPorID,
    UpdateUsuarioPorId
    

} 