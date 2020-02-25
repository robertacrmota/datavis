const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    thumbnail_url: String,
    url: String,
    description: String,
    year: Number
});

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;
