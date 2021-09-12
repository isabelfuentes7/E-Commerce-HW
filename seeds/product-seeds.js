const { Product } = require('../models');

const productData = [
  {
    productName: 'Asus keyboard series 7',
    productPrice: 44.99,
    productStock: 10,
    categoryId: 4,
  },
  {
    productName: 'DELL 7 8i',
    productPrice: 900.0,
    productStock: 15,
    categoryId: 1,
  },
  {
    productName: 'HP core5',
    productPrice: 799.99,
    productStock: 17,
    categoryId: 1,
  },
  {
    productName: 'Samsung 7',
    productPrice: 299.99,
    productStock: 20,
    categoryId: 2,
  },
  {
    productName: 'Apple Mouse',
    productPrice: 99.99,
    productStock: 19,
    categoryId: 3,
  },
  {
    productName: 'Apple Headphone',
    productPrice: 399.99,
    productStock: 14,
    categoryId: 5,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
