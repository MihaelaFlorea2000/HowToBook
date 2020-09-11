const router = require('express').Router();
const Shelf = require('../models/Shelf');

// List all shelves
router.get('/', async (req, res, next) => {
  try {
    const shelves = await Shelf.find();
    res.json(shelves);
  } catch (error) {
    res.status(400);
    next(error);
  }
})

// List a shelf
router.get('/:shelfId', async (req, res, next) => {
  try {
    const shelfId = req.params.shelfId;
    const shelf = await Shelf.findById(shelfId);
    res.json(shelf);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

// Create a new shelf
router.post('/add', async (req, res, next) => {
  const name = req.body.name;

  const shelf = new Shelf({
    name: name
  });

  // Use default if field is left empty
  if (req.body.imageURL) {
    shelf.imageURL = req.body.imageURL;
  }

  try {
    await shelf.save();
    res.json({
      message: 'Shelf added!'
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
})

// Change shelf details
router.patch('/:shelfId', async (req, res, next) => {
  try {
    await Shelf.updateOne({
      _id: req.params.shelfId
    }, {
      $set: req.body
    });
    res.json({
      message: "Shelf updated!"
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
})

// Add new book to shelf
router.patch('/:shelfId/add/:bookId', async (req, res, next) => {
  try {
    const shelf = await Shelf.findById(req.params.shelfId);
    shelf.books.push(req.params.bookId);
    await shelf.save();
    res.json({
      message: 'Book added to shelf!'
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
})

// Remove book from shelf
router.patch('/:shelfId/remove/:bookId', async (req, res, next) => {
  try {
    const shelf = await Shelf.findById(req.params.shelfId);

    const index = shelf.books.indexOf(req.params.bookId);
    if (index > -1) {
      shelf.books.splice(index, 1);
    }

    await shelf.save();
    res.json({
      message: 'Book removed from shelf!'
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
})

// Delete a shelf
router.delete('/:shelfId', async (req, res, next) => {
  try {
    const shelfId = req.params.shelfId;
    await Shelf.findByIdAndDelete(shelfId);
    res.json({
      message: 'Shelf deleted'
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
});


module.exports = router;
