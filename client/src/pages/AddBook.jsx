import React, { useState } from 'react';
import bookIcon from '../images/book.svg';
import AddButton from '../components/AddButton';
import axios from 'axios';

export default function AddBook() {

  const [book, setBook] = useState({
    title: '',
    author: '',
    series: '',
    description: '',
    cover: ''
  });

  const [message, setMessage] = useState({
    text: '',
    style: ''
  });

  function onChangeTitle(e) {
    setBook({
      ...book,
      title: e.target.value
    })
  }

  function onChangeAuthor(e) {
    setBook({
      ...book,
      author: e.target.value
    })
  }

  function onChangeSeries(e) {
    setBook({
      ...book,
      series: e.target.value
    })
  }

  function onChangeDescription(e) {
    setBook({
      ...book,
      description: e.target.value
    })
  }

  function onChangeCover(e) {
    setBook({
      ...book,
      cover: e.target.value
    })
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newBook = {
      title: book.title,
      author: book.author,
      series: book.series,
      description: book.description,
      cover: book.cover
    }

    const res = await axios.post('http://localhost:5000/books/add', newBook);
    
    if (res.statusText === 'OK') {
      setMessage({
        text: `Book "${newBook.title}" added!`,
        style: 'okMessage'
      });
    } else {
      setMessage({
        text: `Book "${newBook.title}" was not added! Try again 😿`,
        style: 'errorMessage'
      });
    }

    setBook({
      title: '',
      author: '',
      series: '',
      description: '',
      cover: ''
    });
  }

  return (
    <section className="addBook">
      <div className="container">
        <h1>Add Book</h1>
        <img className="form-icon" src={bookIcon} alt="book-icon"/>
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title:</label>
          <input 
            onChange={onChangeTitle}
            value={book.title}
            type="text" 
            name="title" 
            placeholder="e.g. Insurgent" 
            required
          />

          <label htmlFor="author">Author:</label>
          <input
            onChange={onChangeAuthor}
            value={book.author}
            type="text" 
            name="author" 
            placeholder="e.g. Veronica Roth" 
            required
          />

          <label htmlFor="series">Series Name:</label>
          <input 
            onChange={onChangeSeries}
            value={book.series}
            type="text" 
            name="series" 
            placeholder="e.g. Divergent" 
          />

          <label htmlFor="description">Description:</label>
          <textarea 
            onChange={onChangeDescription}
            value={book.description}
            name="description" 
            cols="30" 
            rows="10" 
            placeholder="What is this book about?"
          ></textarea>

          <label htmlFor="cover">Cover:</label>
          <input 
            onChange={onChangeCover}
            value={book.cover}
            type="text" 
            name="cover" 
            placeholder="e.g. https://google.com/divergent.jpg"
            required
          />

          <AddButton text="Book" />
          <p className={message.style}>{message.text}</p>
        </form>
      </div>
    </section>
  );
}