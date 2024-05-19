const {Router} = require('express');
const{
    CreateUsuario,
    getUsuarios,
    getUsuarioPorID,
    UpdateUsuarioPorId

} =require('../controllers/usuario');

const router = Router();


/**
 * Obtiene todos 
 */
router.get('/',  getUsuarios);

/**
 * Obtiene por id
 */
router.get('/:id',  getUsuarioPorID);

/**
 * Crear 
 */
router.post('/',CreateUsuario );

/**
 * Actualiza por id
 */
router.put('/:id',  UpdateUsuarioPorId);


module.exports = router;
