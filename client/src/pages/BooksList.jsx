import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';

export default function BooksList() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    
    (async function getBooks() {
      
      const res = await axios.get('http://localhost:5000/books');
      
      setBooks(res.data);

    })();
  }, [])

  // Delete book 
  async function deleteBook(bookId) {
      await axios.delete(`http://localhost:5000/books/${bookId}`);
      window.location='/'
  }


  return (
    <section className="books-list">
      <div className="container">
        <h1>My Books</h1>
        <div className="books__grid">
          {books.map((book) => {
            return (
              <div key={book._id} className="books__item">
                <Link to={`/books/${book._id}`}>
                  <img className="books__cover" src={book.cover} alt={`${book.title} cover`} />
                  <h3 className="books__title">{book.title}</h3>
                  <p className="books__author">{book.author}</p>
                </Link> 
                <ConfirmDialog onDelete={deleteBook} id={book._id} text="icon"/>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

