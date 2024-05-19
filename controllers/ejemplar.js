const { request, response } = require('express');
const Ejemplar = require('../models/ejemplar');
const Libro = require('../models/libro');




/**
 * crear
 */
const createEjemplar = async (req = request, res = response) => {
    try{
         const { libro } = req.body;
         console.log(req.body)

        
         // Libro
         const libroBD = await Libro.findOne({
            _id: libro._id
        });
        if(!libroBD){
            return res.status(400).json({
                msj: 'No existe libro'
            }) 
        }
 
        // Agregar campos adicionales
        const { ubicacion  } = req.body;
        const datos = {
            ubicacion
        };

        // Crear instancia de Proyecto con los datos
        const ejemplar = new Ejemplar({ ...datos, ...req.body });

        // Guardar el proyecto en la base de datos
        await ejemplar.save();

        // Retornar la respuesta con el objeto proyecto creado
        return res.status(201).json(ejemplar);
    } catch (e) {
        // Manejar errores
        return res.status(500).json({
            msj: e.message || 'Error interno del servidor'
        });
    }
};


/**
 * Consultar Proyectso
 * 
 */
const getEjemplares = async (req, res = response) => {
    try{
        const ejemplarBD = await Ejemplar.find()
        .populate({
            path: 'libro' 
        })
        return res.json(ejemplarBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}


// actualizar por ID
const updateEjemplarPorId = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date()
        const ejemplar = await Ejemplar.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(ejemplar);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}


// Get por ID
const getEjemplarPorId = async (req, res = response) => {
    try {
        const { id } = req.params;
        const ejemplar = await Ejemplar.findById(id)
            .populate('libro');
           

        if (!ejemplar) {
            return res.status(404).json({ msj: 'libro no econtrado' });
        }

        return res.json(ejemplar);
    } catch (error) {
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
}
 

module.exports = { 
  createEjemplar,
   getEjemplares,
   getEjemplarPorId,
   updateEjemplarPorId
}





