import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

// VIEW ORDER DETAILS
const viewOrder = (obj) => {
  clearDom();

  // .reduce() is used to calculate the sum of a specific key for every element in an array
  // (prev, next) => prev + +next.price is a callback function which takes two parameters
  // prev === accumulator, next === current element being iterated over
  // + is a unary plus operator to converts from a string to a number
  // however unary does not handle for non-numberical characters like decimals
  // so sometimes you will get weird totals like $60.90002392
  // I switched to a parseInt instead to be sure I am handling the different format of strings
  // 10 is the radix parameter to determine how to interpret the digits in the string being parsed.
  const total = obj.books.reduce((prev, next) => prev + parseInt(next.price, 10), 0);

  const btnString = `<button class="btn btn-success btn-lg mb-4" id="show-books-not-in-order-btn--${obj.firebaseKey}">Add A Book To Order</button>`;
  renderToDOM('#add-button', btnString);

  let domString = `<h1>Order Total: $${total}</h1>`;
  domString += `
  <div class="card">
  <div class="card-body" style="height: 180px;">
    <h5 class="card-title">${obj.customer_first_name} ${obj.customer_last_name} </h5>
    <p class="card-text">${obj.notes}</p>
      <hr>
      <i class="btn btn-success fas fa-eye" id="view-order-btn--${obj.firebaseKey}"></i>
      <i id="edit-order-btn--${obj.firebaseKey}" class="fas fa-edit btn btn-info"></i>
      <i id="delete-order-btn--${obj.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
  </div>
</div>`;

  if (obj.books.length) {
    obj.books.forEach((item) => {
      domString += `
        <div class="card">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${item.title}</h5>
            <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fas fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
            <hr>
            <i class="btn btn-success" id="view-book-btn--${item.firebaseKey}"><span id="view-book-btn--${item.firebaseKey}" class="fas fa-eye"></span></i>
            <i id="delete-book-from-order-btn--${item.firebaseKey}--${obj.firebaseKey}" class="btn btn-danger"><span id="delete-book-from-order-btn--${item.firebaseKey}--${obj.firebaseKey}" class="fas fa-trash-alt"></span></i>
            </div>
        </div>`;
    });
  } else {
    domString += '<p>There are No Books in Order</p>';
  }

  // REF: LINE 41
  // WHEN REMOVING A BOOK TO THE ORDER YOU NEED BOTH THE BOOK FIREBASEKEY AND THE ORDER FIREBASEKEY
  // TO DELETE AN ORDERBOOK OBJECT WE NEED THE FIREBASEKEY OF THE MANY-TO-MANY RELATIONSHIP
  // SO WE INCLUDE BOTH IN THIS ID SO WE CAN SPLIT ON IT LATER.
  domString += '</div>';

  renderToDOM('#view', domString);
};

export default viewOrder;
