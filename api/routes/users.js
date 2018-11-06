const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET request to /users',
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'User was added',
    })
})

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId
    res.status(200).json({
        message: 'User details',
    })
})

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId
    res.status(200).json({
        message: 'User deleted',
    })
})

module.exports = router
