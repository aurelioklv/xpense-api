const Expense = require('../models/Expense');
const Category = require('../models/Category');

const defineAssociations = () => {
    Category.hasMany(Expense, {foreignKey: 'categoryId',});
    Expense.belongsTo(Category, {foreignKey: 'categoryId'});
};

module.exports = defineAssociations;
