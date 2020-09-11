// Require all modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

// Require middleware
const middlewares = require('./middlewares');
const booksRouter = require('./routes/books');
const shelvesRouter = require('./routes/shelves');

// Create app
const app = express();

// Connect to db
const url = process.env.DATABASE_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// App middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello 🌏!'
  })
})

// Routers middleware
app.use('/books', booksRouter);
app.use('/shelves', shelvesRouter);

// Error handling middleware
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})
