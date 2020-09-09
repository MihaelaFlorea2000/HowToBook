const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  series: String,
  description: String,
  cover: {
    type: String,
    required: true
  },
  readStatus: {
    type: String,
    enum: ['read', 'notRead', 'nowRead'],
    default: 'notRead'
  },
  reads: [{
    dateStarted: Date,
    dateFinished: Date,
    rating: {
      type: Number,
      min: 0,
      max: 5
    },
    review: String
  }]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;


