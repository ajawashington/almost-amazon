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

const getBooksNotInTheOrder = async (uid, orderFirebaseKey) => {
  // GET ALL THE BOOKS
  const allBooks = await getBooks(uid);

  // GET ALL THE ORDERBOOKS RELATES TO THE ORDER
  const orderBooks = await getOrderBooks(orderFirebaseKey);

  // GET THE BOOKS FOUND IN THE ORDERBOOKS, RETURNS AN ARRAY OF PROMISES
  const booksInOrderPromises = await orderBooks.map((ob) => getSingleBook(ob.book_id));

  // USE PROMISE.ALL() TO RETURN EACH BOOK OBJECT
  const booksInOrder = await Promise.all(booksInOrderPromises);

  // FILTER AND COMPARE USING .SOME() THE TWO ARRAYS OF ALL BOOKS AND ALL ORDERBOOKS
  // IF A BOOK IS FOUND IN ORDERBOOKS THEN IT WILL NOT BE RETURN IN THIS ARRAY
  const filteredBooks = await allBooks.filter((bb) => !booksInOrder.some((ee) => bb.firebaseKey === ee.firebaseKey));
  // ONLY RETURN THE BOOKS NOT RELATED TO ORDER
  return filteredBooks;
};

const getOrderAndBooks = async (orderFirebaseKey) => {
//  GET THE SINGLE ORDER
  const order = await getSingleOrder(orderFirebaseKey);

  // GET THE ORDERBOOKS RELATED TO THE ORDER
  const orderBooks = await getOrderBooks(orderFirebaseKey);

  // GET THE SINGLE BOOKS IN ORDER RETURNS AN ARRAY OF PROMISES
  const books = await orderBooks.map((ob) => getSingleBook(ob.book_id));
  // PROMISE.ALL TO GET ALL BOOK OBJECTS
  const booksOnOrder = await Promise.all(books);

  // RETURN THE ORDER OBJECT AND THE ARRAY OF BOOKS FOUND IN ORDERBOOKS
  return { ...order, books: booksOnOrder };
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
