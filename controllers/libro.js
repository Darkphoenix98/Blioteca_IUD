const { request, response } = require('express');
const Libro = require('../models/libro');
const Autor = require('../models/autor');
const Editorial = require('../models/editorial');


/**
 * crear
 */
const createLibro = async (req = request, res = response) => {
    try{
         const { autor, editorial } = req.body;
         console.log(req.body)

        
         // Autor
         const autorBD = await Autor.findOne({
            _id: autor._id
        });
        if(!autorBD){
            return res.status(400).json({
                msj: 'No existe Autor'
            })
        }
        //  editorial
        const editorialDB = await Editorial.findOne({
            _id: editorial._id
        });
        if(!editorialDB){
            return res.status(400).json({
                msj: 'No existe Editorial'
            })     
        }
       
        // Agregar campos adicionales
        const {serial,titulo,ISBN, descripcion,imagen, fecha_publicacion } = req.body;
        const datos = {
            serial,
            titulo,
            ISBN,
            descripcion,
            imagen,
            fecha_publicacion
        };

        // Crear instancia de Proyecto con los datos
        const libro = new Libro({ ...datos, ...req.body });

        // Guardar el proyecto en la base de datos
        await libro.save();

        // Retornar la respuesta con el objeto proyecto creado
        return res.status(201).json(libro);
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
const getLibros = async (req, res = response) => {
    try{
        const libroBD = await Libro.find()
        .populate({
            path: 'autor' 
        })
        .populate({
            path: 'editorial'  
        }) 
       
        return res.json(libroBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}


// actualizar por ID
const updateLibroPorId = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date()
        const libro = await Libro.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(libro);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}


// Get por ID
const getLibroPorId = async (req, res = response) => {
    try {
        const { id } = req.params;
        const libro = await Libro.findById(id)
            .populate('autor')
            .populate('editorial');

        if (!libro) {
            return res.status(404).json({ msj: 'libro no encontrado' });
        }

        return res.json(libro);
    } catch (error) {
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
}


module.exports = { 
   createLibro,
   getLibros,
   getLibroPorId,
   updateLibroPorId

}





