const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// get all products
router.get('/', (req, res) => {
  Product.findAll({
    attributes: ['id', 'productName', 'productPrice', 'productStock'],
    include: [
      {model: Category,attributes: ['categoryName']},
      {model: Tag,attributes: ['tagName']}
    ]
  })
    .then(productData => res.json(productData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product based on id number
router.get('/:id', (req, res) => {
  Product.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'productName', 'productPrice', 'productStock'],
    include: [
      {model: Category, attributes: ['categoryName']},
      {model: Tag,attributes: ['tagName']}
    ]
  })
    .then(productData => {
      if (!productData) {
        res.status(404).json({message: 'Product is not available'});
        return;
      }
      res.json(productData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// add new product
router.post('/', (req, res) => {
 Product.create({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productStock: req.body.productStock,
    categoryId: req.body.categoryId,
    tagIds: req.body.tagIds
    })
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tagId) => {
          return {
            productId: product.id,
            tagId,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      return ProductTag.findAll({ where: { productId: req.params.id } });
    })
    .then((productTags) => {
      const productTagIds = productTags.map(({ tagId }) => tagId);
      const newProductTags = req.body.tagIds
        .filter((tagId) => !productTagIds.includes(tagId))
        .map((tagId) => {
          return {
            productId: req.params.id,
            tagId,
          };
        });
      const productTagsToRemove = productTags
        .filter(({ tagId }) => !req.body.tagIds.includes(tagId))
        .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});


  // delete product
router.delete('/:id', (req, res) => {

  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(productData => {
    if (!productData) {
      rs.status(404).json({message: 'product is not available'});
      return;
    }
    res.json(productData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
