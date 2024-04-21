const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({include: {model: Product}});
  // find all tags
  // be sure to include its associated Product data
    res.status(200).json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({where: {id: req.params.id}});

    res.status(200).json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create({tag_name: req.body.tag_name});

    res.status(200).json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update({tag_name: req.body.tag_name}, {where: {id: req.params.id}});

    res.status(200).json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({where: {id: req.params.id}});
    
    res.status(200).json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
