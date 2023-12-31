import { Route,Routes } from 'react-router-dom';
import React, {useState} from 'react';
import './index.css';
import Books from './Components/Books';
import Addbook from './Components/Addbook';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditBook from './Components/Editbook';
import Login from './Login';
//import Login from './Login';
function App() {

  // setting initial states
  const bookData = [
    { id: 1, name: 'Book 1', author: 'Author1', year: '1989'},
    { id: 2, name: 'Book 2', author: 'Author 2', year: '2000'},
    { id: 2, name: 'Book 3', author: 'Author 3', year: '2020'}
  ]
  const formState = {id:null, name:'', author:'', year:''}
  const [books, setBooks] = useState(bookData);
  const [edit, setEdit] = useState(false);
  const [currentBook, setCurrentBook] = useState(formState);

  // CRUD OPERATIONS
  // CREATE A BOOK
  const addBook = book => {
    book.id = books.length + 1;
    setBooks([...books, book]);
  }

  // EDIT A BOOK
  const editBook = book => {
    setEdit(true)
    setCurrentBook({ id:book.id, name:book.name, author:book.author, year:book.year })
  }
  // UPDATE A BOOK
  const updateBook = (id, updatedBook) => {
    setEdit(false)
    setBooks(books.map(book => (book.id === id ? updatedBook : book )))
  }
  // REMOVE A BOOK
  const deleteBook = id => {
    setEdit(false);
    setBooks(books.filter(book => book.id !== id))
  }
      


  return (

    <div className="container">

      <button onClick={handleLogin} className="login-button">Login</button>

      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
      <div className="header">
        <h1>LIBRARY APP WITH REACT JS</h1>
        <br/>
        <br/>
      </div>
      <div className="row library">
      <div className="col-sm-6 add-book">
        {edit ? (
          <div>
              <h2>Edit Book</h2>
              <EditBook 
                edit={edit}
                setEdit={setEdit}
                currentBook={currentBook}
                updateBook={updateBook}
              />
          </div>
        ) : (
          <div>
            <h1>Add A Book</h1>
              <Addbook
                addBook={addBook}
            />
          </div>
        )}
      </div>
      <div className="col-md-6">
        <h1>Available Books</h1>
          <Books
            books={books}
            editBook={editBook}
            deleteBook={deleteBook}
          />
      </div>
      
      </div>
    </div>
  );
}

export default App;
