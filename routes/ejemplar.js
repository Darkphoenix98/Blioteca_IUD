const {Router} = require('express');
const{
    createEjemplar,
    getEjemplares,
    getEjemplarPorId,
    updateEjemplarPorId

} =require('../controllers/ejemplar');

const router = Router();

/**
 * Obtiene todos 
 */
router.get('/', getEjemplares);

/**
 * Obtiene por id
 */
router.get('/:id', getEjemplarPorId);

/**
 * Crear 
 */
router.post('/',createEjemplar);

/**
 * Actualiza por id
 */
router.put('/:id', updateEjemplarPorId );


module.exports = router;