const mongoose = require('mongoose')


/**
 * Model => alienSchema
 *
 * | RDBMS    | MONGODB     |
 * |----------|-------------|
 * | Database | Database    |
 * | Tables   | Collections |
 * | Rows     | Documents   |
 * | Columns  | Fields      |
 * 
 */

const alienSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    sub: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Alien', alienSchema)