import { createBook, getBooks, updateBook } from '../api/bookData';
import { createOrder, getOrders, updateOrder } from '../api/orderData';
import { showBooks } from '../pages/books';
import { showOrders } from '../pages/orders';

const formEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target.id.includes('submit-book')) {
      const payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
        uid
      };

      createBook(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateBook(patchPayload).then(() => {
          getBooks(uid).then(showBooks);
        });
      });
    }

    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
        firebaseKey,
      };

      updateBook(payload).then(() => {
        getBooks(uid).then(showBooks);
      });
    }

    if (e.target.id.includes('submit-order')) {
      const payload = {
        title: document.querySelector('#title').value,
        customer_first_name: document.querySelector('#customer_first_name').value,
        customer_last_name: document.querySelector('#customer_last_name').value,
        notes: document.querySelector('#notes').value,
        uid
      };
      createOrder(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateOrder(patchPayload).then(() => {
          getOrders(uid).then(showOrders);
        });
      });
    }

    if (e.target.id.includes('update-order')) {
      const [, firebaseKey] = e.target.id.split('--');

      const payload = {
        title: document.querySelector('#title').value,
        customer_first_name: document.querySelector('#customer_first_name').value,
        customer_last_name: document.querySelector('#customer_last_name').value,
        notes: document.querySelector('#notes').value,
        firebaseKey,
        uid
      };

      updateOrder(payload).then(() => {
        getOrders(uid).then(showOrders);
      });
    }

    // FIXME: ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      console.warn('CLICKED SUBMIT AUTHOR');
    }
    // FIXME:ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default formEvents;
