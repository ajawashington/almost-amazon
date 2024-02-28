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

  // GET THE BOOKS FOUND IN THE ORDERBOOKS, RETURNS AN ARRAY OF PROMISES
  const bookPromises = await orderBooks.map((orderBook) => getSingleBook(orderBook.book_id));

  // USE PROMISE.ALL() TO RETURN EACH BOOK OBJECT
  const books = await Promise.all(bookPromises);

  // FILTER AND COMPARE USING .SOME() THE TWO ARRAYS OF ALL BOOKS AND ALL ORDERBOOKS
  // IF A BOOK IS FOUND IN ORDERBOOKS THEN IT WILL NOT BE RETURN IN THIS ARRAY
  const filterBooks = await allBooks.filter((obj) => !books.some((e) => e.firebaseKey === obj.firebaseKey));

  // ONLY RETURN THE BOOKS NOT RELATED TO ORDER
  return filterBooks;
};

// THIS IS TO GET THE ORDER DETAILS
const getOrderAndBooks = async (orderFirebaseKey) => {
//  GET THE SINGLE ORDER
  const order = await getSingleOrder(orderFirebaseKey);

  // GET THE ORDERBOOKS RELATED TO THE ORDER
  const allOrderBooks = await getOrderBooks(orderFirebaseKey);

  // GET THE SINGLE BOOKS IN ORDER RETURNS AN ARRAY OF PROMISES
  const allBooksInOrder = await allOrderBooks.map((orderBook) => getSingleBook(orderBook.book_id));

  // PROMISE.ALL TO GET ALL BOOK OBJECTS
  const books = await Promise.all(allBooksInOrder);

  // RETURN THE ORDER OBJECT AND THE ARRAY OF BOOKS FOUND IN ORDERBOOKS
  return { ...order, books };
};

// THIS IS USED TO REMOVE A BOOK FROM AN ORDER
const getASingleBookOrder = async (bookFirebaseKey, orderFirebaseKey) => {
  // GET ALL THE ORDERBOOKS RELATED TO THE ORDER
  const orderBooks = await getOrderBooks(orderFirebaseKey);

  // FIND THE SINGLE BOOK WHERE ORDERBOOK.BOOK_ID IS EQUAL TO THE BOOKFIREBASEKEY
  const bookOrder = await orderBooks.find((orderBook) => orderBook.book_id === bookFirebaseKey);

  // RETURN THE SINGLE ORDERBOOK SO YOU CAN HAVE THE FIREBASEKEY TO DELETE
  return bookOrder;
};

export {
  getBookDetailsPt2, getOrderAndBooks, getBooksNotInTheOrder, getASingleBookOrder
};
