const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// Get all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'productName', 'productPrice', 'productStock', 'categoryId']
    }
  })
    .then(categoryData => {
      if(!categoryData) {
        res.status(404).json({message: 'Categories is not available'});
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});



// find category by id 
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'productName', 'productPrice', 'productStock', 'categoryId']
    }
  })
    .then(categoryData => {
      if(!categoryData) {
        res.status(404).json({message: 'Categories is not available'});
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});


// Add a new category
router.post('/', (req, res) => {
  
  Category.create({
    categoryName: req.body.categoryName
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




// update a category 
router.put('/:id', (req, res) => {
  
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({message:'Category is not available!'});
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


  // delete a category 
router.delete('/:id', (req, res) => {

  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData){
        res.status(404).json({message: 'Category is not available!'});
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
