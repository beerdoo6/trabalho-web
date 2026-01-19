const express = require('express');
const router = express.Router();
const professoresController = require('../controllers/professoresController');

router.post('/', professoresController.criar);         
router.get('/', professoresController.listar);         
router.get('/:id', professoresController.buscarPorId); 
router.put('/:id', professoresController.atualizar);   
router.delete('/:id', professoresController.excluir);  

module.exports = router;
