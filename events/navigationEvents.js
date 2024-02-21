import { booksOnSale } from '../api/bookData';
import { showBooks } from '../pages/books';
import { signOut } from '../utils/auth';
import { booksOnSale, getBooks } from '../api/bookData';
import { showBooks } from '../pages/books';
import { getAuthors, getFavoriteAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors';

// navigation events
const navigationEvents = () => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale().then(showBooks);
  });

  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks().then(showBooks);
  });
<<<<<<< HEAD
  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
=======

>>>>>>> f9bb784babd42c63fef1ca81ffa1b40e1ca2f781
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors().then(showAuthors);
  });

  document.querySelector('#favorite-authors').addEventListener('click', () => {
    getFavoriteAuthors().then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE

      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
