import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { listBooks, removeBook } from '../API';

export default function BooksList() {

  // Array of all books in the library
  const [books, setBooks] = useState([]);

  async function getBooks() {
    const newBooks = await listBooks();
    setBooks(newBooks);
  }

  useEffect(() => {  
    getBooks();
  }, [])

  // Delete a book from the library
  async function deleteBook(bookId) {
    await removeBook(bookId);
    getBooks();
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
                <ConfirmDialog 
                  onDelete={deleteBook} 
                  id={book._id} 
                  text="icon"
                  alertMessage={`Are you sure you want to permanently delete ${book.title} from your library? All ratings and reviews associated with this book witll be removed. This can't be undone.`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

