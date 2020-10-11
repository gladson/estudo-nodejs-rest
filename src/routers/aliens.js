const express = require("express");
const { validationResult } = require("express-validator");

const validate = require("../validators/validate");
const Alien = require("../models/aliens");

const router = express.Router();

/**
 * Route => alien
 */

router.get("/", async (req, res) => {
    try {
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const pageNumber = parseInt(req.query.pageNumber, 10) || 1;

        const options = {
            limit: pageSize,
            page: pageNumber,
            sort: "-createdAt",
        };

        Object.keys(req.query).forEach((key) => {
            if (key === "pageNumber" || key === "pageSize") {
                delete req.query[key];
            }
        });

        // for (const key of Object.keys(req.query)) {
        //   if (key === 'pageNumber' || key === 'pageSize') {
        //     delete req.query[key];
        //   }
        // }

        /* eslint no-param-reassign: "error" */
        const query = Object.keys(req.query).reduce((mappedQuery, key) => {
            if (req.query[key]) {
                mappedQuery[key] =
                    typeof req.query[key] === "boolean"
                        ? req.query[key]
                        : new RegExp(req.query[key], "i");
            }
            return mappedQuery;
        }, {});

        const aliens = await Alien.paginate(query, options);
        console.log(typeof aliens);
        res.status(200).json(aliens);
        // Alien.paginate(query, options).then(function(aliens){
        //     res.json(aliens)
        // })
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error: Desculpe ocorreu um problema",
            });
        }
    }
});

router.post("/", validate.validatePostAlien(), async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({
                success: false,
                message: errors,
            });
        }

        const alien = new Alien({
            name: req.body.name,
            tech: req.body.tech,
            sub: req.body.sub,
        });

        const resultAlien = await alien.save();
        res.json(resultAlien);
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error: Desculpe ocorreu um problema",
            });
        }
    }
});

router.get("/:id", async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        if (alien === null) {
            res.status(404).json({
                success: false,
                message:
                    "Error: Desculpe não conseguimos encontrar em nossa base dados",
            });
        }
        res.json(alien);
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error: Desculpe ocorreu um problema",
            });
        }
    }
});

router.patch("/:id", validate.validatePatchAlien(), async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({
                success: false,
                message: errors,
            });
        }

        const alien = await Alien.findById(req.params.id);
        if (alien === null) {
            res.status(404).json({
                success: false,
                message:
                    "Error: Desculpe não conseguimos encontrar em nossa base dados",
            });
        }
        alien.sub = req.body.sub;
        const resultChangeAlien = await alien.save();
        res.json(resultChangeAlien);
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error: Desculpe ocorreu um problema",
            });
        }
    }
});

router.put("/:id", validate.validatePutAlien(), async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({
                success: false,
                message: errors,
            });
        }

        const alien = await Alien.findById(req.params.id);
        if (alien === null) {
            res.status(404).json({
                success: false,
                message:
                    "Error: Desculpe não conseguimos encontrar em nossa base dados",
            });
        }
        alien.set(req.body);
        // alien.sub = req.body.sub
        // alien.name = req.body.name
        // alien.tech = req.body.tech
        const resultChangeAlien = await alien.save();
        res.json(resultChangeAlien);
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error: Desculpe ocorreu um problema",
            });
        }
    }
});

router.delete("/todos", async (req, res) => {
    try {
        const alien = await Alien.deleteMany({ name: "Gladson" });
        if (alien === null) {
            res.status(404).json({
                success: false,
                message:
                    "Error: Desculpe não conseguimos encontrar em nossa base dados",
            });
        }
        res.json(alien);
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error: Desculpe ocorreu um problema",
            });
        }
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const alien = await Alien.findByIdAndRemove(req.params.id);
        if (alien === null) {
            res.status(404).json({
                success: false,
                message:
                    "Error: Desculpe não conseguimos encontrar em nossa base dados",
            });
        }
        res.json(alien);
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error: Desculpe ocorreu um problema",
            });
        }
    }
});

module.exports = router;
