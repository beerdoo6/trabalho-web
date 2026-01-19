const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursosController');

router.post('/', cursosController.criar);         
router.get('/', cursosController.listar);         
router.get('/:id', cursosController.buscarPorId); 
router.put('/:id', cursosController.atualizar);   
router.delete('/:id', cursosController.excluir);  

module.exports = router;
