const { Category } = require('../models');
const categoryData = [
  {
    categoryName: 'Laptop',
  },
  {
    categoryName: 'Desktop',
  },
  {
    categoryName: 'Mouse',
  },
  {
    categoryName: 'Keyboard',
  },
  {
    categoryName: 'Headphone',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);
module.exports = seedCategories;
