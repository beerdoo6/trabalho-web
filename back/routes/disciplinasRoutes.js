const express = require('express');
const router = express.Router();
const disciplinasController = require('../controllers/disciplinasController');

router.post('/', disciplinasController.criar);         
router.get('/', disciplinasController.listar);         
router.get('/:id', disciplinasController.buscarPorId); 
router.put('/:id', disciplinasController.atualizar);   
router.delete('/:id', disciplinasController.excluir);  

module.exports = router;
