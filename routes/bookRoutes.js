const express = require('express');
const Book = require('../models/book');
const router = express.Router();

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new book' });
});

router.get('/', (req, res) => {
    Book.find()
     .then((result) => {
        res.render('index', { title: 'All Books', books: result});
     })
     .catch((err) => {
        console.error(err);
     })  
});

router.post('/', (req,res) => {
    const book = new Book(req.body)
console.log(book);
  book.save()
    .then((result) => {
        res.redirect('/books');
    })
    .catch((err) => {
        console.error(err);
    })
})



router.get('/:id', (req, res) => {
    const id = req.params.id
    Book.findById(id)
     .then((result) => {
        res.render('details', { book: result, title: 'Book Details' });
     })
     .catch((err) => {
        console.error(err);
     })

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

  Book.findByIdAndDelete(id)
    .then((result) => {
       res.json({ redirect: '/books'}) 
    })
    .catch((err) => {
        console.error(err)
    
    })
})

module.exports = router;