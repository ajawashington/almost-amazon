import { getBooksNotInTheOrder } from '../api/mergedData';
import renderToDOM from '../utils/renderToDom';

const addBooksToOrder = async (uid, orderId) => {
  let domString = '';
  const array = await getBooksNotInTheOrder(uid, orderId);

  if (!array.length) {
    domString += '<p style="color:white">All Available Books Are Added</p>';
  } else {
    array.forEach((item) => {
      domString += `
      <div class="card">
      <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 80px; width: 80px;">
      <div class="card-body" style="height: 80px">
        <h5 class="card-title">${item.title}</h5>
          <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
          <hr>
      </div>
    </div>
        <i class="btn btn-success fas fa-eye" id="view-book-btn--${item.firebaseKey}"></i>
        <i id="add-book-order-btn--${item.firebaseKey}--${orderId}" class="btn btn-danger">Add Book To Bag</i>`;
    });
  }

  renderToDOM('#cart', domString);
};

export default addBooksToOrder;
