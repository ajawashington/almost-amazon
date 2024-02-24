import client from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = client.databaseURL;

<<<<<<< HEAD
const getBooks = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json`, {
=======
// TODO: GET BOOKS
const getBooks = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
>>>>>>> 044baf0 (User specific)
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});
// TODO: DELETE BOOK
const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
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
  })
    .then((response) => response.json())
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

// TODO: FILTER BOOKS ON SALE
const booksOnSale = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
<<<<<<< HEAD
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
=======
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        const saleBooks = Object.values(data).filter((obj) => obj.sale);
        resolve(saleBooks);
      } else {
        resolve([]);
      }
    })
>>>>>>> 044baf0 (User specific)
    .catch(reject);
});

const getBookAuthors = (bookFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookAuthors.json?orderBy="book_id"&equalTo="${bookFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getSingleBook,
  updateBook,
  getBookAuthors,
};
