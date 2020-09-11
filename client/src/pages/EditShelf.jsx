import React, { useState, useEffect } from 'react';
import EditButton from '../components/EditButton';
import shelfIcon from '../images/bookshelf.svg';
import { editShelf, listShelf } from '../API';

export default function EditShelf(props) {

  // Shelf and shelf Id
  const shelfId = props.match.params.shelfId;

  const [shelf, setShelf] = useState({});

  const [newShelf, setNewShelf] = useState({
    name: '',
    imageURL: ''
  });

  useEffect(() => {

    (async function getShelf() {

      const resShelf = listShelf(shelfId);

      setShelf(resShelf);

      const newShelf = {
        name: resShelf.name,
        imageURL: resShelf.imageURL
      }

      setNewShelf(newShelf);

    })();
  }, [shelfId])

  const [message, setMessage] = useState({
    text: '',
    style: ''
  });

  function onChangeName(e) {
    setNewShelf({
      ...newShelf,
      name: e.target.value
    });
  }

  function onChangeImageURL(e) {
    setNewShelf({
      ...newShelf,
      imageURL: e.target.value
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const editedShelf = {
      name: newShelf.name,
      imageURL: newShelf.imageURL
    }

    const res = await editShelf(shelfId, editedShelf);

    if (res.statusText === 'OK') {
      setMessage({
        text: `Shelf "${newShelf.name}" changed!`,
        style: 'okMessage'
      });

      window.location = `/shelves/${shelf._id}`;

    } else {
      setMessage({
        text: `Shelf "${newShelf.name}" was not changed! Try again 😿`,
        style: 'errorMessage'
      });
    }
  
  }

  return (
    <section className="addShelf">
      <div className="container">
        <h1>Edit Shelf</h1>
        <img className="form-icon" src={shelfIcon} alt="shelf-icon" />
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            onChange={onChangeName}
            value={newShelf.name}
            type="text"
            name="name"
            placeholder="e.g. Favorite Books"
            required
          />

          <label htmlFor="image">Image:</label>
          <input
            onChange={onChangeImageURL}
            value={newShelf.imageURL}
            type="text"
            name="image"
            placeholder="e.g. https://google.com/books.jpg"
          />

          <EditButton text='Shelf' />
          <p className={message.style}>{message.text}</p>
        </form>
      </div>
    </section>
  );
}