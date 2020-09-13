import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import EditButton from '../components/EditButton';
import AddButton from '../components/AddButton';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { listShelf, listBooks, addToShelf, removeFromShelf } from '../API';

export default function Shelf(props) {

  // Shelf and shelfId
  const shelfId = props.match.params.shelfId;
  const [shelf, setShelf] = useState([]);

  // Shelf Books
  const [shelfBooks, setShelfBooks] = useState([]);

  // AddBook dropdown options
  const [options, setOptions] = useState([]);

  async function getShelf() {

    const newShelf = await listShelf(shelfId);
    setShelf(newShelf);

    const newBooks = await listBooks();

    const newShelfBooks = [];
    const newOptions = [];

  
    newBooks.map((newBook) => {
      
      if (newShelf.books.includes(newBook._id)) { // Book is on the shelf
        newShelfBooks.push(newBook);

      } else { // Book is not the shelf

        const bookOption = {
          value: newBook._id,
          label: newBook.title
        }

        newOptions.push(bookOption);
      }
    });

    setShelfBooks(newShelfBooks);
    setOptions(newOptions);
  }
  
  useEffect(() => {
    getShelf();
  }, [])

  // Add book to shelf
  const [addBookId, setAddBookId] = useState('');

  function onChangeAddBookId(option) {
    setAddBookId(option.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    await addToShelf(shelfId, addBookId);
    setAddBookId('');
    getShelf();
  }

  // Remove book from shelf
  async function removeBook(bookId) {
    await removeFromShelf(shelfId, bookId);
    getShelf();
  }

  const defaultImgUrl = 'https://dwgyu36up6iuz.cloudfront.net/heru80fdn/image/upload/c_fill,d_placeholder_thescene.jpg,fl_progressive,g_face,h_450,q_80,w_800/v1590006383/thenewyorker_the-oddest-terms-used-for-antique-books-explained.jpg';

  return (
    <section className="shelf">
      <div className="overlay"></div>
      <div className="shelf__image">
        <object data={defaultImgUrl} type="image/png">
          <img src={shelf.imageURL} alt={shelf.name} />
        </object> 
      </div>
      
      <div className="container">
        <h1 className="shelf__name">{shelf.name}</h1>
        <form onSubmit={onSubmit}> 
          <label htmlFor="addBook">Add Book to Shelf:</label>
          <div className="shelf__addBook">
            <Dropdown
              className="dropdown"
              options={options}
              onChange={onChangeAddBookId}
              value={addBookId}
              placeholder="Choose book"
            />
            <AddButton text="Book" />
          </div>
        </form>

        <hr />

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
                  onDelete={removeBook} 
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