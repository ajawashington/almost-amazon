import { getAuthors, getFavoriteAuthors } from '../api/authorData';
import { booksOnSale, getBooks } from '../api/bookData';
import { searchStore } from '../api/mergedData';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';
import { signOut } from '../utils/auth';
import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

// navigation events
const navigationEvents = (uid) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(uid).then(showBooks);
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(uid).then(showBooks);
  });

  document.querySelector('#logo').addEventListener('click', () => {
    getBooks(uid).then(showBooks);
  });
  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(uid).then(showAuthors);
  });

  document.querySelector('#favorite-authors').addEventListener('click', () => {
    getFavoriteAuthors(uid).then(showAuthors);
  });
  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE
      searchStore(searchValue, uid).then(({ books, authors }) => {
        if (books.length > 0 || authors.length > 0) {
          clearDom();
          console.warn(books, authors);
          showAuthors(authors, false);
          showBooks(books, false);
        } else {
          clearDom();
          const domString = '<h1>No Results</h1>';
          renderToDOM('#author-store', domString);
        }
      });

      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
