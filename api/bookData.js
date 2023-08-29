import client from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = client.databaseURL;

const getBooks = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

const createBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const booksOnSale = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((response) => response.json())
    .then((data) => {
      const filteredBooks = Object.values(data).filter((book) => book.sale);
      resolve(filteredBooks);
    })
    .catch(reject);
});

//  STRETCH...SEARCH BOOKS
const searchBooks = (searchValue, uid) => new Promise((resolve, reject) => {
  getBooks(uid).then((booksArray) => {
    const searchResults = booksArray.filter((book) => (
      book.title.toLowerCase().includes(searchValue)
      || book.description.toLowerCase().includes(searchValue)
    ));

    resolve(searchResults);
  }).catch(reject);
});

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getSingleBook,
  updateBook,
  searchBooks,
};
