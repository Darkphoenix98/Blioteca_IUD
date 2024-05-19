const { Router } = require("express");

const{
   createLibro,
   getLibros,
   getLibroPorId,
   updateLibroPorId
}=require('../controllers/libro')

const router = Router();


/**
 * Obtiene todos 
 */
router.get('/', getLibros);


/**
 * Crear 
 */
router.post('/',createLibro );

/**
 * Actualiza por id
 */
router.put('/:id',  updateLibroPorId);

/**
 * Get por id
 */
router.get('/:id',  getLibroPorId);


module.exports = router;
