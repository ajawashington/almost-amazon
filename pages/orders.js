import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyOrders = () => {
  const domString = '<h1>No Orders</h1>';
  renderToDOM('#store', domString);
};

const showOrders = (array) => {
  clearDom();
  console.warn(array);
  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-order-btn">Add A Order</button>';
  renderToDOM('#add-button', btnString);
  let domString = '';

  if (array) {
    array.forEach((item) => {
      domString += `
          <div class="card">
            <div class="card-body" style="height: 180px;">
              <h5 class="card-title">${item.customer_first_name} ${item.customer_last_name} </h5>
              <p class="card-text">${item.notes}</p>
                <hr>
                <i class="btn btn-success fas fa-eye" id="view-order-btn--${item.firebaseKey}"></i>
                <i id="edit-order-btn--${item.firebaseKey}" class="fas fa-edit btn btn-info"></i>
                <i id="delete-order-btn--${item.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
            </div>
          </div>`;
      renderToDOM('#store', domString);
    });
  } else {
    emptyOrders();
  }
};

export { showOrders, emptyOrders };
