// import sequelize library
const { Model, DataTypes } = require('sequelize');
// import  database connection from config file
const sequelize = require('../config/connection');

// Initialize Product table/ Sequelize's Model class
class Product extends Model {}

    // set up fields in product table
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        productName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        productPrice: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          validate: {
            isDecimal: true
          }
        },
        productStock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 10,
          Validate: {
            isNumeric: true
          }
        },
        categoryId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'category',
            key: 'id'
          }
        }
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
      }
);

module.exports = Product;
