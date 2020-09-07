import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShelvesList() {

  const [shelves, setShelves] = useState([]);

  useEffect(() => {

    (async function getShelves() {

      const res = await axios.get('http://localhost:5000/shelves');
      
      setShelves(res.data);

    })();
  }, [])

  return (
    <section className="shelves">
      <div className="container">
        <h1>My Shelves</h1>
        <div className="shelf__grid">
          {shelves.map((shelf) => {
            return (
              <div key={shelf._id} className="shelf__item">
                <div className="shelf__image">
                  <img src={shelf.imageURL} alt={shelf.name} />
                </div>
                <div className="shelf__info">
                  <h3 className="shelf__name">{shelf.name}</h3>
                  <p className="shelf__number">
                    {shelf.books.length} 
                    {shelf.books.length === 1 ? " book" : " books"}
                  </p>  
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}