import { getSingleAuthor } from './authorData';
import { getBooks, getSingleBook } from './bookData';
import { getOrderBooks } from './orderBooksData';
import { getSingleOrder } from './orderData';

// for merged promises
const getBookDetailsPt2 = async (bookFirebaseKey) => {
  const bookObject = await getSingleBook(bookFirebaseKey);
  const authorObject = await getSingleAuthor(bookObject.author_id);

  return { ...bookObject, authorObject };
};

// GET BOOKS NOT RELATED TO AN ORDER
const getBooksNotInTheOrder = async (orderId, uid) => {
  // GET ALL THE BOOKS
  const allBooks = await getBooks(uid);

  // GET ALL THE ORDERBOOKS RELATES TO THE ORDER
  const orderBooks = await getOrderBooks(orderId);

  // GET THE BOOKS FOUND IN THE ORDER BOOKS, RETURNS AN ARRAY OF PROMISES
  const bookPromises = await orderBooks.map((orderBook) => getSingleBook(orderBook.book_id));

  // MOST USE PROMISE.ALL() TO RETURN EACH BOOK OBJECT
  const books = await Promise.all(bookPromises);

  // FILTER AND COMPARE THE TWO ARRAYS OF ALL BOOKS AND ALL ORDERBOOKS
  const filterBooks = await allBooks.filter((obj) => !books.some((e) => e.firebaseKey === obj.firebaseKey));

  // ONLY RETURN THE BOOKS NOT RELATED TO ORDER
  return filterBooks;
};

const getOrderAndBooks = async (orderFirebaseKey) => {
  const order = await getSingleOrder(orderFirebaseKey);
  const allOrderBooks = await getOrderBooks(orderFirebaseKey);
  const allBooksInOrder = await allOrderBooks.map((orderBook) => getSingleBook(orderBook.book_id));

  const books = await Promise.all(allBooksInOrder);

  return { ...order, books };
};

const getASingleBookOrder = async (bookFirebaseKey, orderFirebaseKey) => {
  const orderBooks = await getOrderBooks(orderFirebaseKey);
  const bookOrder = await orderBooks.find((orderBook) => orderBook.book_id === bookFirebaseKey);

  return bookOrder;
};

export {
  getBookDetailsPt2, getOrderAndBooks, getBooksNotInTheOrder, getASingleBookOrder
};
