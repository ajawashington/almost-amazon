import { signOut } from '../utils/auth';
import { booksOnSale, getBooks, searchBooks } from '../api/bookData';
import { emptyBooks, showBooks } from '../pages/books';
import { getAuthors, getFavoriteAuthors } from '../api/authorData';
import { emptyAuthors, showAuthors } from '../pages/authors';

// navigation events
const navigationEvents = (user) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(user.uid).then(showBooks);
  });

  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(user.uid).then((array) => {
      if (array.length) {
        showBooks(array);
      } else {
        emptyBooks();
      }
    });
  });

  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(user.uid).then((array) => {
      if (array.length) {
        showAuthors(array);
      } else {
        emptyAuthors();
      }
    });
  });

  document.querySelector('#favorite-authors').addEventListener('click', () => {
    getFavoriteAuthors().then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE
      searchBooks(searchValue, user.uid)
        .then((search) => {
          if (search.length) {
            showBooks(search);
          } else {
            emptyBooks();
          }
        });
      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
