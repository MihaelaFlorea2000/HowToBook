import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function BooksList() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    
    (async function getBooks() {
      
      const res = await axios.get('http://localhost:5000/books');
      
      setBooks(res.data);

    })();
  }, [])

  return (
    <section className="books">
      <div className="container">
        <h1>My Books</h1>
        <div className="book__grid">
          {books.map((book) => {
            return (
              <div key={book._id} className="book__item">
                <img className="book__cover" src={book.cover} alt={`${book.title} cover`} />
                <h3 className="book__title">{book.title}</h3>
                <p className="book__author">{book.author}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

