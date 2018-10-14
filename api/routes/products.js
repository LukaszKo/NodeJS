/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {
  model: Product
} = require('../models/products');

router.get('/', (req, res, next) => {
  Product.find()
    .select('name quantity price')
    .exec()
    .then(products => {
      res.status(200).json(products);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Product was created',
        product
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name quantity price')
    .exec()
    .then(product => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({
          message: 'There is no product with that id'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOptions = { ...req.body
  };

  Product.update({
      _id: id
    }, {
      $set: updateOptions
    })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product was updated'
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;

  Product.deleteOne({
      _id: id
    })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product was removed'
      });
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

module.exports = router;
