// for merged promises

import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getBooks, getSingleBook } from './bookData';
import { getOrderBooks, getSingleOrder } from './orderData';

const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(firebaseKey).then((bookObj) => {
    getSingleAuthor(bookObj.author_id).then((authorObject) => {
      resolve({ ...bookObj, authorObject });
    });
  }).catch(reject);
});

const getAuthorDetails = async (firebaseKey) => {
  const author = await getSingleAuthor(firebaseKey);
  const books = await getAuthorBooks(author.firebaseKey);

  return { ...author, books };
};

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorsBookArray) => {
    const deleteBookPromises = authorsBookArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

const getOrderDetails = async (orderId) => {
  const order = await getSingleOrder(orderId);
  const allOrderBooks = await getOrderBooks(orderId);
  const getSingleBooks = await allOrderBooks.map((book) => getSingleBook(book.bookId));
  const orderBooks = await Promise.all(getSingleBooks);

  return { ...order, orderBooks };
};

const getBooksNotInTheOrder = async (uid, orderId) => {
  const allBooks = await getBooks(uid);
  const orderBooks = await getOrderBooks(orderId);
  const bookPromises = await orderBooks.map((book) => getSingleBook(book.bookId));
  const books = await Promise.all(bookPromises);
  const filterBooks = await allBooks.filter((obj) => !books.some((e) => e.firebaseKey === obj.firebaseKey));

  return filterBooks;
};

export {
  getBookDetails, getAuthorDetails, deleteAuthorBooksRelationship, getOrderDetails, getBooksNotInTheOrder
};
