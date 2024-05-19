const { Router } = require("express");

const{
  createPrestamo,
  getPrestamos,
  getPrestamoPorId,
  updatePrestamoPorId
}=require('../controllers/prestamo')

const router = Router();


/**
 * Obtiene todos 
 */
router.get('/',  getPrestamos);


/**
 * Crear 
 */
router.post('/',createPrestamo );

/**
 * Actualiza por id
 */
router.put('/:id', updatePrestamoPorId);

/**
 * Get por id
 */
router.get('/:id',  getPrestamoPorId);


module.exports = router;
