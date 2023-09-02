import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import addBooksToOrder from './addBooksToOrder';

const viewOrder = (obj, uid) => {
  clearDom();
  let domString = '';
  // SUM UP PRICE OF ORDER USING THE .REDUCE() array method
  // Grab the previous value and add the next value...starting at 0
  const total = obj.orderBooks.reduce((prev, next) => prev + next.price, 0);

  domString += `
  <div class="text-white ms-5 details">
  <h2>${obj.customerName} ${obj.orderType}</h2>
  Order Email: <a href="mailto:${obj.email}">${obj.email}</a>
  </div>
  <div>
  <h3 style="color:white">Books In Order</h3>
    <h2 style="color:white">$${parseInt(total, 10)}</h2>`;

  obj.orderBooks.forEach((item) => {
    domString += `
    <div class="card">
    <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 100px; width: 80px;">
    <div class="card-body" style="height: 80px">
      <h5 class="card-title">${item.title}</h5>
        <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
        <i id="delete-book-from-order-btn--${item.firebaseKey}--${obj.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
        <hr>
    </div>
  </div>
  </div>
  <br/>
  <br/>`;
  });

  renderToDOM('#view', domString);

  // Call Function to Render Books NOT related to the viewed Order
  addBooksToOrder(uid, obj.firebaseKey);
};

export default viewOrder;
