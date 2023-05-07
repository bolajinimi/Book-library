const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    Title: {
        type: 'string',
        required: true
    },
    datePublished: {
        type: Date,
        required: true,
        default: new Date().toISOString()
    },
  
    Genre: {
        type: 'string',
        required: true
    },
    Publisher: {
        type: 'string',
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    Description: {
        type: 'string',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps:true});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;