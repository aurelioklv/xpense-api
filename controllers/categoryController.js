const Category = require('../models/Category');
const {Op} = require("sequelize");

exports.createCategory = async (req, res, next) => {
    try {
        const {name} = req.body;
        const expense = await Category.create({name})
        res.status(201).json(expense)
    } catch (error) {
        next(error)
    }
}

exports.getAllCategory = async (req, res, next) => {
    const {like} = req.query
    const filterConditions = {}

    if (like) {
        filterConditions.name = {
            [Op.iLike]: `%${like}%`
        }
    }
    try {
        const {count, rows} = await Category.findAndCountAll({
            where: filterConditions
        })
        if (count === 0) {
            return res.status(404).json({message: 'Category not found'})
        }
        return res.json(rows)
    } catch (error) {
        next(error)
    }
}

exports.getCategoryById = async (req, res, next) => {
    const id = req.params.id
    try {
        const category = await Category.findByPk(id)
        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }
        return res.json(category);
    } catch (error) {
        next(error)
    }
}

exports.updateCategoryById = async (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
        const expense = await Category.findByPk(id);
        if (!expense) {
            return res.status(404).json({message: 'Category not found'})
        }
        await expense.update(updatedData)
        return res.status(200).json(expense)
    } catch (error) {
        next(error)
    }
}

exports.deleteCategoryById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const count = await Category.destroy({
            where: {id: id}
        })

        if (count === 0) {
            return res.status(404).json({message: 'Category not found'})
        }

        return res.status(204).send();
    } catch (error) {
        next(error)
    }
}