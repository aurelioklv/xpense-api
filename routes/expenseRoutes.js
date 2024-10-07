const express = require('express');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const {
    createExpense,
    getAllExpense,
    getExpenseById,
    updateExpenseById,
    deleteExpenseById
} = require('../controllers/expenseController');
const router = express.Router();

router.use(apiKeyMiddleware)

router.post('/', createExpense);
router.get('/', getAllExpense);
router.get('/:id', getExpenseById);
router.patch('/:id', updateExpenseById);
router.delete('/:id', deleteExpenseById);

module.exports = router;
