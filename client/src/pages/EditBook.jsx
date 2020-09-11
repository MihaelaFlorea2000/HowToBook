import React, { useState, useEffect } from 'react';
import bookIcon from '../images/book.svg';
import EditButton from '../components/EditButton';
import { editBook, listBook } from '../API';

export default function EditBook(props) {

  // Book and book Id
  const bookId = props.match.params.bookId;

  const [book, setBook] = useState({});

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    series: '',
    description: '',
    cover: ''
  });

  useEffect(() => {

    (async function getBook() {

      const resBook = await listBook(bookId);

      setBook(resBook);

      const newBook = {
        title: resBook.title,
        author: resBook.author,
        series: resBook.series,
        description: resBook.description,
        cover: resBook.cover
      }

      setNewBook(newBook);

    })();
  }, [bookId])

  const [message, setMessage] = useState({
    text: '',
    style: ''
  });

  function onChangeTitle(e) {
    setNewBook({
      ...newBook,
      title: e.target.value
    })
  }

  function onChangeAuthor(e) {
    setNewBook({
      ...newBook,
      author: e.target.value
    })
  }

  function onChangeSeries(e) {
    setNewBook({
      ...newBook,
      series: e.target.value
    })
  }

  function onChangeDescription(e) {
    setNewBook({
      ...newBook,
      description: e.target.value
    })
  }

  function onChangeCover(e) {
    setNewBook({
      ...newBook,
      cover: e.target.value
    })
  }

  async function onSubmit(e) {
    e.preventDefault();

    const editedBook = {
      title: newBook.title,
      author: newBook.author,
      series: newBook.series,
      description: newBook.description,
      cover: newBook.cover
    }

    const res = await editBook(bookId, editedBook);

    if (res.statusText === 'OK') {
      setMessage({
        text: `Book "${newBook.title}" changed!`,
        style: 'okMessage'
      });

      window.location = `/books/${book._id}`;

    } else {
      setMessage({
        text: `Book "${newBook.title}" was not changed! Try again 😿`,
        style: 'errorMessage'
      });
    }

  }

  return (
    <section className="addBook">
      <div className="container">
        <h1>Edit Book</h1>
        <img className="form-icon" src={bookIcon} alt="book-icon" />
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            onChange={onChangeTitle}
            value={newBook.title}
            type="text"
            name="title"
            placeholder="e.g. Insurgent"
            required
          />

          <label htmlFor="author">Author:</label>
          <input
            onChange={onChangeAuthor}
            value={newBook.author}
            type="text"
            name="author"
            placeholder="e.g. Veronica Roth"
            required
          />

          <label htmlFor="series">Series Name:</label>
          <input
            onChange={onChangeSeries}
            value={newBook.series}
            type="text"
            name="series"
            placeholder="e.g. Divergent"
          />

          <label htmlFor="description">Description:</label>
          <textarea
            onChange={onChangeDescription}
            value={newBook.description}
            name="description"
            cols="30"
            rows="10"
            placeholder="What is this book about?"
          ></textarea>

          <label htmlFor="cover">Cover:</label>
          <input
            onChange={onChangeCover}
            value={newBook.cover}
            type="text"
            name="cover"
            placeholder="e.g. https://google.com/divergent.jpg"
            required
          />

          <EditButton text="Book" />
          <p className={message.style}>{message.text}</p>
        </form>
      </div>
    </section>
  );
}