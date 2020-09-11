import React, {useState, useEffect} from 'react';
import StarRatings from 'react-star-ratings';
import AddButton from '../components/AddButton';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ReadMore from '../components/ReadMore';
import ConfirmDialog from '../components/ConfirmDialog';
import formatDate from '../formatDate';
import EditButton from '../components/EditButton';
import { Link } from 'react-router-dom';
import { listBook, changeStatus, addRead, removeBook } from '../API';

export default function Book(props) {

  // Book and book Id
  const bookId = props.match.params.bookId;

  const [book, setBook] = useState({});
  const [bookReads, setBookReads] = useState([]);
  const [message, setMessage] = useState({
    text: '',
    style: ''
  });

  async function getBook() {

    const newBook = await listBook(bookId);

    setBook(newBook);

    if (newBook.reads.length > 0) {
      setBookReads(newBook.reads);
    }

  }

  useEffect(() => {
    getBook();
  }, [])

  // Read status drop-down
  const options = [
    {
      value: 'notRead',
      label: 'Want to Read'
    },
    {
      value: 'read',
      label: 'Read'
    },
    {
      value: 'nowRead',
      label: 'Currently Reading'
    }
  ];

  async function onChangeStatus(status) {
    if (status.value === 'read') {
      setShowForm(true);
    } else {
      setShowForm(false);
      await changeStatus(bookId, status.value);
    }
  }

  // Read form
  const [read, setRead] = useState({
    dateStarted: '',
    dateFinished:  '',
    rating: 0,
    review: ''
  });

  const [showForm, setShowForm] = useState(false);

  function onChangeDateStarted(e) {
    setRead({
      ...read,
      dateStarted: e.target.value
    });
  }

  function onChangeDateFinished(e) {
    setRead({
      ...read,
      dateFinished: e.target.value
    });
  }

  function onChangeRating(newRating) {
    setRead({
      ...read,
      rating: newRating
    });
  }
  
  function onChangeReview(e) {
    setRead({
      ...read,
      review: e.target.value
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newRead = {
      dateStarted: new Date(read.dateStarted),
      dateFinished: new Date(read.dateFinished),
      rating: read.rating,
      review: read.review
    }

    if (newRead.dateStarted <= newRead.dateFinished) {
      await addRead(bookId, newRead);

      setRead({
        dateStarted: '',
        dateFinished: '',
        rating: 0,
        review: ''
      })

      setShowForm(false);
      getBook();
    } else {
      setMessage({
        text: 'The day you started reading can\'t be after the day you finished!',
        style: 'errorMessage'
      });
    }
  }

  // Delete this book 
  async function deleteBook() {
    await removeBook(bookId);
    window.location = '/';
  }

  return (
    <section className="book">
      <div className="blur" style={{ backgroundImage: `url(${book.cover})`}}></div>
      <div className="overlay"></div>
    
      <div className="container">
        <div className="book__header">
          <div className="book__header__item">
            <img className="book__cover" src={book.cover} alt={book.title} />
          </div>
          <div className="book__header__item">
            <h1 className="book__title">{book.title}</h1>
            <p className="book__series">{book.series}</p>
            <h3 className="book__author">by {book.author}</h3>
            <hr />
            <div className="book__status">
              <h3 className="book__subtitle">Read Status</h3>
              <Dropdown
                options={options}
                onChange={onChangeStatus}
                value={book.readStatus}
                placeholder="Select an option"
              />
            </div>
          </div>
        </div>
        {showForm &&

          <form onSubmit={onSubmit} noValidate>
            <div className="book__form">
              <label htmlFor="dateStarted">Date started:</label>
              <input
                type="date"
                name="dateStarted"
                value={read.dateStarted}
                onChange={onChangeDateStarted}
              />

              <label htmlFor="dateFinished">Date finished:</label>
              <input
                type="date"
                name="dateFinished"
                value={read.dateFinished}
                min={read.dateStarted}
                onChange={onChangeDateFinished}
              />

              <label htmlFor="rating">Rating:</label>
              <StarRatings
                rating={read.rating}
                starRatedColor="#ff2e63"
                starHoverColor="#ff2e63"
                changeRating={onChangeRating}
                numberOfStars={5}
                name="rating"
                starDimension="29px"
                starSpacing="2px"
              />

              <label htmlFor="review">Review:</label>
              <textarea
                value={read.review}
                onChange={onChangeReview}
                name="review"
                cols="30"
                rows="10"
                placeholder="How was this book?"
              ></textarea>
            </div>

            <AddButton text="Review" />
            <p className={message.style}>{message.text}</p>
          </form>
        }
      
        <hr />

        <div className="book__description">
          <h3 className="book__subtitle">Book Description</h3>
          <ReadMore maxCharacterCount={500}>
            {`${book.description}`}
          </ReadMore>
        </div>

        <hr />

        {bookReads.length > 0 && 

          <div className="book__reviews">
            <h3 className="book__subtitle">Book Reviews</h3>
            <div className="book__reviews__grid">
              {bookReads.map((read) => {
                return (
                  <div className="book__read" key={read._id}>
                    <div className="book__read__date">
                      <p>Started:</p>
                      <p>{formatDate(read.dateStarted)}</p>
                    </div>
                    
                    <div className="book__read__date">
                      <p>Finished:</p>
                      <p>{formatDate(read.dateFinished)}</p>
                    </div>

                    <div className="book__read__rating">
                      <p>Rating:</p>
                      <StarRatings
                        rating={read.rating}
                        starRatedColor="#ff2e63"
                        starHoverColor="#ff2e63"
                        numberOfStars={read.rating}
                        starDimension="25px"
                        starSpacing="2px"
                      />
                    </div>
                    <div className="book__read__review">
                      <p>Review:</p>
                      <ReadMore maxCharacterCount={300}>
                        {`${read.review}`}
                      </ReadMore>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        }

        <div className="book__buttons">
          <Link to={`/books/${bookId}/edit`}>
            <EditButton text="Book" />
          </Link>
          <ConfirmDialog 
            onDelete={deleteBook} 
            id={bookId} 
            text="Book" 
            alertMessage={`Are you sure you want to permanently delete ${book.title} from your library? All ratings and reviews associated with this book witll be removed. This can't be undone.`}
          />
        </div>

      </div>
    </section>
  );
}