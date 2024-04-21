const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  // find all categories
  const categories = await Category.findAll({
    include: [{
      model: Product,
    }],
  });
  // be sure to include its associated Products
  res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
      // find one category by its `id` value
      const category = await Category.findOne({where: {id: req.params.id}, include: [{model: Product}]})
      // be sure to include its associated Products
      res.status(200).json(category);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
  // create a new category
  const category = await Category.create({ category_name: req.body.category_name });
  
  res.status(200).json(category);
} catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {// update a category by its `id` value
  const category = await Category.update({ category_name: req.body.category_name }, {where: {id: req.params.id }});
  
  res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
  // delete a category by its `id` value
  const category = await Category.destroy({where: {id: req.params.id}});

  res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
