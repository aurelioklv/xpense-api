const Expense = require('../models/Expense');
const {Op} = require("sequelize");

exports.createExpense = async (req, res, next) => {
    const {description, amount, categoryId} = req.body;

    try {
        console.log(req.body)
        const expense = await Expense.create({
            description: description,
            amount: amount,
            categoryId: categoryId
        })
        res.status(201).json(expense)
    } catch (error) {
        next(error)
    }
}

exports.getAllExpense = async (req, res, next) => {
    console.log(req.query)
    const {min, max, desc, recent} = req.query
    const filterConditions = {}

    if (min) {
        filterConditions.amount = {
            [Op.gte]: parseInt(min)
        }
    }
    if (max) {
        filterConditions.amount = {
            ...filterConditions.amount,
            [Op.lte]: parseInt(max)
        }
    }
    if (desc) {
        filterConditions.description = {
            [Op.iLike]: `%${desc}%`
        }
    }
    if (recent) {
        const current = new Date();

        filterConditions.createdAt = {
            [Op.lte]: current,
            [Op.gte]: new Date(current - recent * 24 * 60 * 60 * 1000),
        };
    }
    console.log(filterConditions)

    try {
        const {count, rows} = await Expense.findAndCountAll({
            where: filterConditions
        })
        if (count === 0) {
            return res.status(404).json({message: 'Expense not found'})
        }
        return res.json(rows)
    } catch (error) {
        next(error)
    }
}

exports.getExpenseById = async (req, res, next) => {
    const id = req.params.id
    try {
        const expense = await Expense.findByPk(id)
        if (!expense) {
            return res.status(404).json({message: 'Not found'})
        }
        return res.status(200).json(expense)
    } catch (error) {
        next(error)
    }
}

exports.updateExpenseById = async (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({message: 'Expense not found'})
        }
        await expense.update(updatedData)
        return res.status(200).json(expense)
    } catch (error) {
        next(error)
    }
}

exports.deleteExpenseById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const count = await Expense.destroy({
            where: {id: id}
        })

        if (count === 0) {
            return res.status(404).json({message: 'Expense not found'})
        }

        return res.status(204).send();
    } catch (error) {
        next(error)
    }
}