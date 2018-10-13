/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET request to /orders'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Order was created'
    });
});

router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
    res.status(200).json({
        message: 'Order details',
        orderId: id
    });
});

router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
    res.status(200).json({
        message: 'Order deleted',
        orderId: id
    });
});

module.exports = router;
