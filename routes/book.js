const express  = require('express'),
      Book     = require('../models/book');
const {isLoggedIn, checkBookOwnership}  = require('./middleware');


const router = express.Router({mergeParams: true});

// INDEX - list all books
router.get('/', (req, res) => {
    Book.find({}, (err, books) => {
        if (err) { console.log(err); res.redirect("back");}

        res.render('../views/book/index', {books});
    });
});

// NEW - show new book form
router.get('/new', isLoggedIn, (req, res) => {
    res.render('../views/book/new', {});
});

// CREATE - create new book, then redirect somewhere
router.post('/', isLoggedIn, (req, res) => {
    Book.create(req.body, (err, book) => {
        if (err) { console.log(err); res.redirect("back"); }

        res.redirect("/books");
    });
});

// SHOW - show information for a specific book
// router.get('/:id', (req, res) => {});

// EDIT - show edit form for a book
router.get('/:id/edit', checkBookOwnership, (req, res) => {
    const bookId = req.params.id;

    Book.findById(bookId, (err, book) => {
        if(err) {console.log(err); res.redirect("/books");}

        res.render("../views/book/edit", {book: book});
    });
});

// UPDATE - update a specific book, then redirect somewhere
router.put('/:id', checkBookOwnership, (req, res) => {
    const bookId = req.params.id;

    Book.findByIdAndUpdate(bookId, req.body, (err, book) => {
       if(err) {console.log(err); res.redirect("back");}

       res.redirect("/books");
    });
});

// DELETE - delete a particular book, then redirect somewhere
router.delete('/:id', checkBookOwnership, (req, res) => {
    const bookId = req.params.id;

    Book.findByIdAndDelete(bookId, err => {
        if(err) {console.log(err);}

        res.redirect("/books");
    })
});

module.exports = router;