import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyOrders = () => {
  const domString = '<h1>No Orders Found</h1>';

  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-order-btn">Add A Order</button>';
  renderToDOM('#add-button', btnString);

  renderToDOM('#store', domString);
};

const showOrders = (array) => {
  clearDom();

  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-order-btn">Add A Order</button>';
  renderToDOM('#add-button', btnString);
  let domString = '';

  if (!array.length) {
    domString += '<p>No Orders Found</p>';
  } else {
    array.forEach((item) => {
      domString += `
        <div class="card">
          <div class="card-body" style="height: 400px;">
            <h2 class="card-title">${item.customerName}</h2>
            <h5 class="card-title">${item.email}</h5>
            <h3 class="card-title">${item.orderType}</h3>
              <i class="btn btn-success fas fa-eye" id="view-order-btn--${item.firebaseKey}"></i>
              <i id="edit-order-btn--${item.firebaseKey}" class="fas fa-edit btn btn-info"></i>
              <i id="delete-order-btn--${item.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
          </div>
        </div>`;
    });
  }

  renderToDOM('#store', domString);
};

export { showOrders, emptyOrders };
