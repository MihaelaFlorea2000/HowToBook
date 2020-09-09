import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function BooksList() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    
    (async function getBooks() {
      
      const res = await axios.get('http://localhost:5000/books');
      
      setBooks(res.data);

    })();
  }, [])

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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

