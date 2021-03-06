import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { listShelves, removeShelf } from '../API';

export default function ShelvesList() {

  const [shelves, setShelves] = useState([]);

  async function getShelves() {
    const newShelves = await listShelves();
    setShelves(newShelves);
  }

  useEffect(() => {
    getShelves();
  }, [])

  // Delete shelf 
  async function deleteShelf(shelfId) {
    await removeShelf(shelfId);
    getShelves();
  }

  return (
    <section className="shelves-list">
      <div className="container">
        <h1>My Shelves</h1>
        <div className="shelves__grid">
          {shelves.map((shelf) => {
            return (
              <div key={shelf._id} className="shelves__item">
                <Link to={`/shelves/${shelf._id}`} className="shelves__link">
                  <div className="shelves__image">
                    <img src={shelf.imageURL} alt={shelf.name} />
                  </div>
                  <div className="shelves__info">
                    <h3 className="shelves__name">{shelf.name}</h3>
                    <p className="shelves__number">
                      {shelf.books.length} 
                      {shelf.books.length === 1 ? " book" : " books"}
                    </p>  
                  </div>
                </Link>
                <ConfirmDialog
                  onDelete={deleteShelf}
                  id={shelf._id}
                  text="icon"
                  fontSize="small"
                  alertMessage={`Are you sure you want to delete this shelf? The books will remain.`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}