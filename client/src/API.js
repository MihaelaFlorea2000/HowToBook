import axios from 'axios';
import { sortBooksByTitle, sortShelvesByName } from './sortArray';

const API_URL = 'http://localhost:5000';

// Get all books sorted by title
export async function listBooks() {
  const res = await axios.get(`${API_URL}/books`);
  sortBooksByTitle(res.data);
  return res.data;
}

// Get a specific book
export async function listBook(bookId) {
  const res = await axios.get(`${API_URL}/books/${bookId}`);
  return res.data;
}

// Add a book 
export async function addBook(book) {
  const res = await axios.post(`${API_URL}/books/add`, book);
  return res;
}

// Edit a book 
export async function editBook(bookId, editedBook) {
  const res = await axios.patch(`${API_URL}/books/${bookId}/`, editedBook);
  return res;
}

// Delete a book 
export async function removeBook(bookId) {
  await axios.delete(`${API_URL}/books/${bookId}`);
}

// Change a book's reading status
export async function changeStatus(bookId, status) {
  await axios.patch(`${API_URL}/books/${bookId}/${status}`);
}

// Add a book review
export async function addRead(bookId, read) {
  await axios.patch(`${API_URL}/books/${bookId}/read`, read);
}

// Get all shelves sorted by name
export async function listShelves() {
  const res = await axios.get(`${API_URL}/shelves`);
  sortShelvesByName(res.data);
  return res.data;
}

// Get a specific shelf
export async function listShelf(shelfId) {
  const res = await axios.get(`${API_URL}/shelves/${shelfId}`);
  return res.data;
}

// Add a shelf 
export async function addShelf(shelf) {
  const res = await axios.post(`${API_URL}/shelves/add`, shelf);
  return res;
}

// Edit a book 
export async function editShelf(shelfId, editedShelf) {
  const res = await axios.patch(`${API_URL}/shelves/${shelfId}/`, editedShelf);
  return res;
}

// Delete a shelf 
export async function removeShelf(shelfId) {
  await axios.delete(`${API_URL}/shelves/${shelfId}`);
}

// Add book to shelf
export async function addToShelf(shelfId, bookId) {
  await axios.patch(`${API_URL}/shelves/${shelfId}/add/${bookId}`);
}

// Remove book from shelf
export async function removeFromShelf(shelfId, bookId) {
  await axios.patch(`${API_URL}/shelves/${shelfId}/remove/${bookId}`);
}