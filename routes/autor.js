const { Router } = require('express');
const { 
    
    CreateAutor,
    getAutores,
    getAutorPorID,
    UpdateAutorPorId

} = require('../controllers/autor');

const router = Router();

/**
 * Obtiene todos 
 */
router.get('/', getAutores);

/**
 * Obtiene por id
 */
router.get('/:id',  getAutorPorID);

/**
 * Crear 
 */
router.post('/',CreateAutor );

/**
 * Actualiza por id
 */
router.put('/:id',  UpdateAutorPorId);


module.exports = router;