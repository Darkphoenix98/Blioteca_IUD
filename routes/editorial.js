const {Router} = require('express');
const{
    CreateEditorial,
    getEditoriales,
    getEditorialPorID,
    UpdateEditorialPorId

} =require('../controllers/editorial');

const router = Router();

/**
 * Obtiene todos 
 */
router.get('/', getEditoriales);

/**
 * Obtiene por id
 */
router.get('/:id', getEditorialPorID);

/**
 * Crear 
 */
router.post('/',CreateEditorial );

/**
 * Actualiza por id
 */
router.put('/:id',UpdateEditorialPorId );


module.exports = router;