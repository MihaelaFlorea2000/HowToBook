import React, {useState, useRef} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import BooksList from './pages/BooksList';
import Book from './pages/Book';
import AddBook from './pages/AddBook';
import ShelvesList from './pages/ShelvesList';
import Shelf from './pages/Shelf';
import CreateShelf from './pages/CreateShelf';
import EditBook from './pages/EditBook';
import EditShelf from './pages/EditShelf';
import { useOnClickOutside } from './hooks';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Colors for the buttons
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0e0220'
    },
    secondary: {
      main: '#ff2e63'
    }
  }
});

function App() {

  // State for mobile menu
  const [isOpen, setOpen] = useState(false);

  // Close mobile menu when clicking outside of it
  const header = useRef();
  useOnClickOutside(header, () => setOpen(false));

  return (
    <>
    <ThemeProvider theme={theme}>
      <Router>
        <div ref={header}>
          <Header isOpen={isOpen} setOpen={setOpen}/>
        </div>
        <Switch> 
          <Route path='/' exact strict component={BooksList}/>
          <Route path='/books/add' exact strict component={AddBook}/>
          <Route path='/books/:bookId' exact strict component={Book}/>
          <Route path='/books/:bookId/edit' exact strict component={EditBook} />
          <Route path='/shelves' exact strict component={ShelvesList}/>
          <Route path='/shelves/add' exact strict component={CreateShelf} />
          <Route path='/shelves/:shelfId' exact strict component={Shelf} />
          <Route path='/shelves/:shelfId/edit' exact strict component={EditShelf} />
        </Switch>
      </Router>
    </ThemeProvider>
    </>
  );
}

export default App;
