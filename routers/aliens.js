const express = require('express')
const { validationResult } = require('express-validator')
const router = express.Router()

const validate = require('../validators/validate')
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

router.post('/', validate.validateAddAlien(), async(req, res) => {
    try {
        const errors = validationResult(req)
    
        if (!errors.isEmpty()) {
            return res.status(422).send({
                success: false,
                message: errors
            })
        }
    
        const alien = new Alien({
            name: req.body.name,
            tech: req.body.tech,
            sub: req.body.sub
        })
        
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

router.patch('/:id', validate.validateChangeAlien(), async (req, res) => {
    try {
        const errors = validationResult(req)
    
        if (!errors.isEmpty()) {
            return res.status(422).send({
                success: false,
                message: errors
            })
        }

        const alien = await Alien.findById(req.params.id)
        alien.sub = req.body.sub
        resultChangeAlien = await alien.save()
        res.json(resultChangeAlien)
    } catch (error) {
        res.send('Error: ' + error)
    }
})

module.exports = router
