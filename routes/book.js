const express = require('express');
const Book = require('../models/book');

const router = express.Router({mergeParams: true});

// INDEX - list all books
router.get('/', (req, res) => {
    Book.find({}, (err, books) => {
        if (err) { console.log(err); res.redirect("back");}
        else {
            res.render('../views/book/index', {books});
        }
    });
});

// NEW - show new book form
router.get('/new', (req, res) => {
    console.log("Show new book form.");
    res.render('../views/book/new', {});
});

// CREATE - create new book, then redirect somewhere
router.post('/', (req, res) => {
    Book.create(req.body, (err, book) => {
        if (err) { console.log(err); res.redirect("back"); }
        console.log("Created new book:");
        console.log(req.body);
        res.redirect("/books");
    });
});

// SHOW - show information for a specific book
// router.get('/:id', (req, res) => {});

// EDIT - show edit form for a book
router.get('/:id/edit', (req, res) => {
    const bookId = req.params.id;
    console.log("Show edit form. Book id: " + bookId);

    Book.findById(bookId, (err, book) => {
        if(err) {console.log(err); res.redirect("/books");}
        else {
            res.render("../views/book/edit", {book: book});
        }
    });
});

// UPDATE - update a specific book, then redirect somewhere
router.put('/:id', (req, res) => {
    const bookId = req.params.id;
    console.log(req.body);
    Book.findByIdAndUpdate(bookId, req.body, (err, book) => {
       if(err) {console.log(err); res.redirect("back");}
       else {
           console.log("Update book. Book id: " + book._id);
           res.redirect("/books");
       }
    });
});

// DELETE - delete a particular book, then redirect somewhere
router.delete('/:id', (req, res) => {
    const bookId = req.params.id;
    console.log(`DELETE request. Book id: ${bookId}`);

    Book.findByIdAndDelete(bookId, err => {
        if(err) {console.log(err);}
        res.redirect("/books");
    })
});

module.exports = router;