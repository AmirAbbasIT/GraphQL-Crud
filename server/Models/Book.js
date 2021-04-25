const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
    },
    authorId: {
        type: int,
        requiredL: true
    }

})

module.exports = new mongoose.model("Book", BookSchema);