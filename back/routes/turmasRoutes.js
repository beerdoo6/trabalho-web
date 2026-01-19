const express = require('express');
const router = express.Router();
const turmasController = require('../controllers/turmasController');

router.post('/', turmasController.criar);         
router.get('/', turmasController.listar);         
router.get('/:id', turmasController.buscarPorId); 
router.put('/:id', turmasController.atualizar);   
router.delete('/:id', turmasController.excluir);  

module.exports = router;
