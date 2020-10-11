const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

/**
 * alienSchema:
 *
 * -> Id: int
 * -> Name: String
 * -> Tech: String
 * -> Sub: Boolean
 *
 */

const alienSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        tech: {
            type: String,
            required: true,
        },
        sub: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

alienSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Alien", alienSchema);
