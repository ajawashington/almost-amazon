/* eslint-disable no-alert */
import { deleteBook, getBooks, getSingleBook } from '../api/bookData';
import {
  getASingleBookOrder, getBookDetailsPt2, getBooksNotInTheOrder, getOrderAndBooks
} from '../api/mergedData';
import { createOrderBook, deleteSingleOrderBook, updateOrderBook } from '../api/orderBooksData';
import addBookForm from '../components/forms/addBookForm';
import addOrderForm from '../components/forms/addOrderForm';
import { showBooks } from '../pages/books';
import { showBooksNotInOrder } from '../pages/booksNotInOrder';
// import { showBooksNotInOrder } from '../pages/booksNotInOrder';
import viewBook from '../pages/viewBook';
import viewOrder from '../pages/viewOrder';
// import viewOrder from '../pages/viewOrder';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('delete-book-btn')) {
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then(() => {
          getBooks(uid).then(showBooks);
        });
      }
    }
    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(uid);
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(uid, bookObj));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getBookDetailsPt2(firebaseKey).then(viewBook);
    }

    // Click Event to view order details;
    if (e.target.id.includes('view-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getOrderAndBooks(firebaseKey).then(viewOrder);
    }

    if (e.target.id.includes('show-books-not-in-order-btn')) {
      const [, orderFirebaseKey] = e.target.id.split('--');
      getBooksNotInTheOrder(orderFirebaseKey, uid).then((booksArray) => showBooksNotInOrder(booksArray, orderFirebaseKey));
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('DELETE AUTHOR', e.target.id);
        console.warn(e.target.id.split('--'));
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      console.warn('ADD AUTHOR');
    }

    // TODO: ADD ORDER
    if (e.target.id.includes('add-order-btn')) {
      addOrderForm();
    }

    // TODO: ADD BOOK TO ORDER
    if (e.target.id.includes('add-book-to-order-btn')) {
      // SPLIT OFF THE BOTH KEYS FROM BUTTON
      const [, bookFirebaseKey, orderFirebaseKey] = e.target.id.split('--');

      // CREATE A PAYLOAD TO REPRESENT THE ORDERBOOK MANY-TO-MANY RELATIONSHIP
      const payload = {
        book_id: bookFirebaseKey,
        order_id: orderFirebaseKey,
        uid
      };

      // CREATE ORDERBOOK
      createOrderBook(payload).then(({ name }) => {
        // PATCH FIREBASEKEY
        const patchPayload = { firebaseKey: name };

        // UPDATE ORDER BOOK
        updateOrderBook(patchPayload).then(() => {
          // CALL GET ALL BOOKS NOT IN THE ORDER SO THE BOOK JUST ADDED WILL NOT SHOW IN VIEW
          // YOU CAN ONLY ADD BOOKS TO ORDER FROM THE showBooksNotInOrder VIEW
          getBooksNotInTheOrder(orderFirebaseKey, uid).then((booksArray) => showBooksNotInOrder(booksArray, orderFirebaseKey));
        });
      });
    }

    // TODO: REMOVE A BOOK FROM AN ORDER
    if (e.target.id.includes('delete-book-from-order-btn')) {
      // SPLIT OFF THE BOTH KEYS FROM BUTTON
      const [, bookFirebaseKey, orderFirebaseKey] = e.target.id.split('--');

      // GET THE SINGLE BOOK ORDER SO YOU HAVE THE FIREBASEKEY
      getASingleBookOrder(bookFirebaseKey, orderFirebaseKey)
        // DELETE SINGLE ORDERBOOK BY FIREBASEKEY
        .then((orderBook) => deleteSingleOrderBook(orderBook.firebaseKey))
        .then(() => {
          // GET ORDER DETAILS AND VIEW ORDER
          getOrderAndBooks(orderFirebaseKey).then(viewOrder);
        });
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default domEvents;
