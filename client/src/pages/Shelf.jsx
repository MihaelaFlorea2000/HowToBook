import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import EditButton from '../components/EditButton';
import AddButton from '../components/AddButton';

export default function Shelf(props) {
  // Shelf and shelfId
  const shelfId = props.match.params.shelfId;
  const [shelf, setShelf] = useState([]);

  // Shelf Books
  const [shelfBooks, setShelfBooks] = useState([]);

  // Not Shelf Books
  const [notShelfBooks, setNotShelfBooks] = useState([]);

  async function getShelf() {

    const resShelf = await axios.get(`http://localhost:5000/shelves/${shelfId}`);
    setShelf(resShelf.data);

    const resBooks = await axios.get('http://localhost:5000/books');

    const newShelfBooks = [];
    const newNotShelfBooks = [];

    resBooks.data.map((resBook) => {
      if (resShelf.data.books.includes(resBook._id)) {
        newShelfBooks.push(resBook);
      } else {
        newNotShelfBooks.push(resBook);
      }
    });

    setShelfBooks(newShelfBooks);
    setNotShelfBooks(newNotShelfBooks);
  }
  
  useEffect(() => {
    getShelf();
  }, [])

  // Add book to shelf
  const [addBookId, setAddBookId] = useState('');

  function onChangeAddBookId(e) {
    setAddBookId(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    
    await axios.patch(`http://localhost:5000/shelves/${shelfId}/add/${addBookId}`);
    getShelf();
  }

  // Remove book from shelf
  async function removeFromShelf(bookId) {
    await axios.patch(`http://localhost:5000/shelves/${shelfId}/remove/${bookId}`);
    getShelf();
  }


  const defaultImgUrl = 'https://dwgyu36up6iuz.cloudfront.net/heru80fdn/image/upload/c_fill,d_placeholder_thescene.jpg,fl_progressive,g_face,h_450,q_80,w_800/v1590006383/thenewyorker_the-oddest-terms-used-for-antique-books-explained.jpg';

  return (
    <section className="shelf">
      <div className="overlay"></div>
      <div className="shelf__image">
        {/* <object data={defaultImgUrl} type="image/png"> */}
          <img src={shelf.imageURL} alt={shelf.name} />
        {/* </object>  */}
      </div>
      
      <div className="container">
        <h1 className="shelf__name">{shelf.name}</h1>
        <form onSubmit={onSubmit}> 
          <label htmlFor="addBook">Add Book to Shelf:</label>
          <div className="shelf__addBook">
            <select 
              name="addBook" 
              value={addBookId} 
              onChange={onChangeAddBookId} 
              required
            >
              <option value="" selected disabled hidden>Choose book </option>
              {notShelfBooks.map((book) => {
                return (
                  <option key={book._id} value={book._id}>{book.title}</option>
                )
              })}
            </select>
            <AddButton text="Book" />
          </div>
        </form>

        <div className="books__grid">
          {shelfBooks.map((book) => {
            return (
              <div key={book._id} className="books__item">
                <Link to={`/books/${book._id}`}>
                  <img className="books__cover" src={book.cover} alt={`${book.title} cover`} />
                  <h3 className="books__title">{book.title}</h3>
                  <p className="books__author">{book.author}</p>
                </Link>
                <ConfirmDialog 
                  onDelete={removeFromShelf} 
                  id={book._id} text="icon" 
                  alertMessage={`Are you sure you want to remove ${book.title} from this shelf? The book will still remain in your library.`}
                />
              </div>
            )
          })}
        </div>
        <Link to={`/shelves/${shelfId}/edit`}>
          <EditButton text="Shelf" />
        </Link>
      </div>
    </section>
    
  );
}