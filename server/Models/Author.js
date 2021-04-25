const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Author name is Required"]
    },
    age: {
        type: String,
        required: [true, "Age is required."]
    }
})

module.exports = mongoose.model("Author", AuthorSchema);