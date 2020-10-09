const express = require('express')
const router = express.Router()
const Alien = require('../models/aliens')

/**
 * Route => alien
 */

router.get('/', async (req, res) => {
    try {
        const aliens = await Alien.find()
        res.json(aliens)
    } catch (error) {
        res.send('Error: ' + error)
    }
})

router.post('/', async(req, res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try {
        const resultAlien = await alien.save()
        res.json(resultAlien)
    } catch (error) {
        res.send('Error: ' + error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        res.json(alien)
    } catch (error) {
        res.send('Error: ' + error)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        alien.sub = req.body.sub
        resultChangeAlien = await alien.save()
        res.json(resultChangeAlien)
    } catch (error) {
        res.send('Error: ' + error)
    }
})

module.exports = router
