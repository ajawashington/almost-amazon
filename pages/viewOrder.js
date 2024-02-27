import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewOrder = (obj) => {
  clearDom();

  const total = obj.books.reduce((prev, next) => prev + next.price, 0);

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

  domString += '</div>';

  renderToDOM('#view', domString);
};

export default viewOrder;
