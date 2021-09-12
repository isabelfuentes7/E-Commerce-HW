// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {foreignKey: 'categoryId'});

// Categories have many Products
Category.hasMany(Product, {foreignKey: 'categoryId'});

// Products belongToMany Tags
Product.belongsToMany(Tag, {through: ProductTag,foreignKey: 'productId',});

// Tags belongToMany Products
Tag.belongsToMany(Product, {through: ProductTag,foreignKey: 'tagId',});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
