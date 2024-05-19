const { request, response } = require('express');
const Prestamo = require('../models/prestamo');
const Ejemplar = require('../models/ejemplar');
const Usuario = require('../models/usuario');





/**
 * crear
 */
const createPrestamo = async (req = request, res = response) => {
    try{
         const { ejemplar, usuario } = req.body;
         console.log(req.body)

        
         // Ejemplar
         const ejemplarBD = await Ejemplar.findOne({
            _id: ejemplar._id
        });
        if(!ejemplarBD){
            return res.status(400).json({
                msj: 'No existe ejemplar'
            }) 
        }
        
        // usuario
        const usuarioBD = await Usuario.findOne({
            _id: usuario._id
        });
        if(!usuarioBD){
            return res.status(400).json({
                msj: 'No existe usuario'
            }) 
        }
        // Agregar campos adicionales
        const {  fecha_Prestamo, fecha_Devolucion} = req.body;
        const datos = {
            fecha_Prestamo, fecha_Devolucion
        };

        // Crear instancia de Proyecto con los datos
        const prestamo = new Prestamo({ ...datos, ...req.body });

        // Guardar el proyecto en la base de datos
        await prestamo.save();

        // Retornar la respuesta con el objeto proyecto creado
        return res.status(201).json(prestamo);
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
const getPrestamos = async (req, res = response) => {
    try{
        const prestamoBD = await Prestamo.find()
        .populate({
            path: 'ejemplar' 
        })
        .populate({
            path: 'usuario' 
        })
        return res.json(prestamoBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}


// actualizar por ID
const updatePrestamoPorId = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date()
        const prestamo = await Prestamo.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(prestamo);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}


// Get por ID
const getPrestamoPorId = async (req, res = response) => {
    try {
        const { id } = req.params;
        const prestamo = await Prestamo.findById(id)
            .populate('ejemplar')
            .populate('usuario');
           

        if (!prestamo) {
            return res.status(404).json({ msj: 'Prestamo  no econtrado' });
        }

        return res.json(prestamo);
    } catch (error) {
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
}
 

module.exports = { 
  createPrestamo,
  getPrestamos,
  getPrestamoPorId,
  updatePrestamoPorId
}





