const express = require('express')
const { validationResult } = require('express-validator')

const validate = require('../validators/validate')
const Alien = require('../models/aliens')

const router = express.Router()

/**
 * Route => alien
 */

router.get('/', async (req, res) => {
    try {
        const pageSize = parseInt(req.query.pageSize) || 10
        const pageNumber = parseInt(req.query.pageNumber) || 1
        
        const options = 
        { 
            limit: pageSize, 
            page: pageNumber, 
            sort: '-createdAt' 
        }

        for (const key of Object.keys(req.query)) {
            if (key === "pageNumber" || key === "pageSize") {
                delete req.query[key];
            }
        }
        
        const query = Object.keys(req.query).reduce((mappedQuery, key) => {
            if (req.query[key]) {
                mappedQuery[key] = typeof req.query[key] === "boolean" ? req.query[key] : new RegExp(req.query[key], 'i')
            }
            return mappedQuery
        }, {})
        
        const aliens = await Alien.paginate(query, options)
        res.status(200).json(aliens);
        // Alien.paginate(query, options).then(function(aliens){
        //     res.json(aliens)
        // })
        
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
