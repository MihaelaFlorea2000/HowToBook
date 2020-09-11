import React, { useState } from 'react';
import shelfIcon from '../images/bookshelf.svg';
import AddButton from '../components/AddButton';
import { addShelf } from '../API';

export default function CreateShelf() {

  const [shelf, setShelf] = useState({
    name: '',
    imageURL: ''
  })
  const [message, setMessage] = useState({
    text: '',
    style: ''
  });

  function onChangeName(e) {
    setShelf({
      ...shelf,
      name: e.target.value
    });
  }

  function onChangeImageURL(e) {
    setShelf({
      ...shelf,
      imageURL: e.target.value
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newShelf = {
      name: shelf.name,
      imageURL: shelf.imageURL
    }

    const res = await addShelf(newShelf);

    if (res.statusText === 'OK') {
      setMessage({
        text: `Shelf "${newShelf.name}" added!`,
        style: 'okMessage'
      });
    } else {
      setMessage({
        text: `Shelf "${newShelf.name}" was not added! Try again 😿`,
        style: 'errorMessage'
      });
    }

    setShelf({
      name: '',
      imageURL: ''
    })
  }

  return (
    <section className="addShelf">
      <div className="container">
        <h1>Create Shelf</h1>
        <img className="form-icon" src={shelfIcon} alt="shelf-icon" />
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name:</label>
          <input 
            onChange={onChangeName}
            value={shelf.name}
            type="text" 
            name="name" 
            placeholder="e.g. Favorite Books" 
            required 
          />

          <label htmlFor="image">Image:</label>
          <input 
            onChange={onChangeImageURL}
            value={shelf.imageURL}
            type="text" 
            name="image" 
            placeholder="e.g. https://google.com/books.jpg" 
          />

          <AddButton text='Shelf' />
          <p className={message.style}>{message.text}</p>
        </form>
      </div>
    </section>
  );
}