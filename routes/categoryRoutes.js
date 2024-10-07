const express = require('express');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} = require('../controllers/categoryController');
const router = express.Router();

router.use(apiKeyMiddleware)

router.post('/', createCategory);
router.get('/', getAllCategory);
router.get('/:id', getCategoryById);
router.patch('/:id', updateCategoryById);
router.delete('/:id', deleteCategoryById);

module.exports = router;
