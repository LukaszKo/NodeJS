/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orders');
const {
  model: Product
} = require('../models/products');

router.get('/', (req, res, next) => {
  Order.find()
    .exec()
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res, next) => {
  const products = req.body.products;

  Promise.all(products.map(product => {
      if (product._id) {
        return Product.findById(product._id)
          .exec()
          .then(result => {
            if (!result) {
              return new Promise((resolve, reject) => reject({
                status: 404,
                message: `Product with this id: ${product._id} does not exist`
              }));
            } else {
              return new Promise((resolve, reject) => resolve());
            }
          });
      } else {
        return new Promise((resolve, reject) => reject({
          status: 500,
          message: `One of the product has no _id`
        }));
      }
    }))
    .then(data => {
      const order = new Order({
        products: req.body.products,
        description: req.body.description
      });

      order.save()
        .then(result => {
          res.status(201).json(result);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    })
    .catch(error => {
      res.status(error.status).json({
        message: error.message
      });
    });

});

router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;

  Order.findById(id)
    .exec()
    .then(order => {
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({
          message: 'Order not found'
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });

});

router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId;

  Order.deleteOne({
      _id: id
    })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order was removed'
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
