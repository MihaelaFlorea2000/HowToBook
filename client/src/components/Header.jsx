import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header({isOpen, setOpen}) {

  return (
    <>
      <header className="header">
        <nav className="container flex flex-jc-sb flex-ai-c">
          <NavLink to="/" exact className="header__logo">
            <h2>How to Book</h2>
          </NavLink>
          <div
            role="button"
            className={`header__toggle hide-on-desktop ${isOpen && "open"}`} 
            onClick={() => setOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="header__links hide-on-mobile">
            <NavLink to="/" exact> My Books </NavLink>
            <NavLink to="/books/add" exact> Add Book </NavLink>
            <NavLink to="/shelves" exact> My Shelves </NavLink>
            <NavLink to="/shelves/add" exact> Create Shelf </NavLink>
          </div>
        </nav>
      </header>
      <div className={`header__menu hide-on-desktop ${isOpen && "open"}`} >
        <NavLink to="/" exact> My Books </NavLink>
        <NavLink to="/books/add" exact> Add Book </NavLink>
        <NavLink to="/shelves" exact> My Shelves </NavLink>
        <NavLink to="/shelves/add" exact> Create Shelf </NavLink>
      </div>
    </>
  );
}

