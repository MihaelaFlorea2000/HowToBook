import React, {useState, useEffect} from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import AddButton from '../components/AddButton';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ReadMore from '../components/ReadMore';


export default function Book(props) {

  // Book and book Id
  const bookId = props.match.params.bookId;

  const [book, setBook] = useState([]);
  const [bookReads, setBookReads] = useState([]);

  useEffect(() => {

    (async function getBooks() {

      const res = await axios.get(`http://localhost:5000/books/${bookId}`);

      setBook(res.data);

      if (res.data.reads.length > 0) {
        setBookReads(res.data.reads);
      }
      
    })();
  }, [bookId])

  // Read state drop-down
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

    console.log(status.label);

    if (status.value === 'read') {
      setShowForm(true);
    } else {
      setShowForm(false);
      await axios.patch(`http://localhost:5000/books/${bookId}/${status.value}`);
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

    console.log(newRead);

    await axios.patch(`http://localhost:5000/books/${bookId}/read`, newRead);

    setRead({
      dateStarted: '',
      dateFinished: '',
      rating: 0,
      review: ''
    })

    setShowForm(false);
  }

  function formatDate(dateString){

    const date = new Date(dateString);

    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    return `${month} ${day}, ${year}`
  }


  return (
    <section className="book">
      <div className="blur" style={{ backgroundImage: `url(${book.cover})`}}></div>
      <div className="overlay"></div>
      <img className="book__cover" src={book.cover} alt={book.title} />
      
      <div className="container">
        <h1 className="book__title">{book.title}</h1>
        <p className="book__series">{book.series}</p>
        <h3 className="book__author">by {book.author}</h3>
        <hr/>

        <div className="book__status">
          <h3 className="book__subtitle">Read Status</h3>
          <Dropdown
            options={options}
            onChange={onChangeStatus}
            value={book.readStatus}
            placeholder="Select an option"
          />

          {showForm &&

            <form onSubmit={onSubmit}>
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

            </form>
          }
        </div>

        <hr />

        <div className="book__description">
          <h3 className="book__subtitle">Book Description</h3>
          <ReadMore maxCharacterCount={300}>
            {`${book.description}`}
          </ReadMore>
        </div>

        <hr />

        <div className="book__reviews">
          <h3 className="book__subtitle">Book Reviews</h3>
          {bookReads.map((read) => {
            return (
              <div className="book__read" key={read._id}>
                <div className="book__read__date">
                  <p>Started:</p>
                  <p>{formatDate(read.dateStarted)}</p>
                </div>
                
                <div className="book__read__date">
                  <p>Finished:</p>
                  <p>{formatDate(read.dateStarted)}</p>
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
    </section>
  );
}