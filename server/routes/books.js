const router = require('express').Router();
const Book = require('../models/Book');

// List all books
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(400);
    next(error);
  }
})

// List a book
router.get('/:bookId', async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    res.json(book);
  } catch (error) {
    res.status(400);
    next(error);
  }
})

// Create a new book
router.post('/add', async(req, res, next) => {
 
    const title = req.body.title;
    const author = req.body.author;
    const series = req.body.series;
    const description = req.body.description;
    const cover = req.body.cover;

    const book = new Book({
      title: title,
      author: author,
      series: series,
      description: description,
      cover: cover
    });

  try {
    await book.save();
    res.json({
      message: 'Book added!'
    })
  } catch (error) {
    res.status(400);
    next(error);
  }
});

// Change general book info
router.patch('/:bookId', async (req, res, next) => {
  try {
    await Book.updateOne({
      _id: req.params.bookId
    }, {
      $set: req.body
    });
    res.json({
      message: 'Book updated!'
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
});

// Mark as read or currently reading
router.patch('/:bookId/:readStatus', async (req, res, next) => {

  const readStatus = req.params.readStatus;

  const dateStarted = Date.parse(req.body.dateStarted);
  const dateFinished = Date.parse(req.body.dateFinished);
  const rating = req.body.rating;
  const review = req.body.review;

  const read = {
    dateStarted: dateStarted,
    dateFinished: dateFinished,
    rating: rating,
    review: review
  }

  try {
    const book  = await Book.findById(req.params.bookId);
    
    if (readStatus === 'read') { // Read
      book.readStatus = readStatus;
      book.reads.push(read);

    } 
    // Currently reading or to read
    else if (readStatus === 'nowRead' || readStatus === 'notRead'){ 
      book.readStatus = readStatus;

    } else { // Invalid
      const error = new Error('Invalid reading status');
      res.status(400);
      next(error);
    }

    await book.save();

    res.json({
      message: 'Read status changed!'
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
});


// Delete a book read
router.patch('/:bookId/read/remove/:readId', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
    const readId = req.params.readId;

    const newReads = []

    book.reads.forEach((read) => {
      if (read._id != readId) {
        newReads.push(read);
      }
    })

    book.reads = newReads;

    await book.save();

    res.json({
      message: 'Review deleted!'
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
})


// Delete a book
router.delete('/:bookId', async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    await Book.findByIdAndDelete(bookId);
    res.json({
      message: 'Book deleted!'
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
})


module.exports = router;