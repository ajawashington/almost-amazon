import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyBooks = () => {
  const domString = '<h1>All Available Books Are In The Order</h1>';
  renderToDOM('#store', domString);
};

const showBooksNotInOrder = (array, orderFirebaseKey) => {
  clearDom();

  let domString = '';

  if (array.length > 0) {
    array.forEach((item) => {
      domString += `
          <div class="card">
            <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 100px;">
            <div class="card-body" style="height: 180px;">
              <h5 class="card-title">${item.title}</h5>
                <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
                <hr>
                <i class="btn btn-success fas fa-eye" id="add-book-to-order-btn--${item.firebaseKey}--${orderFirebaseKey}">Add Book To Order</i>
            </div>
          </div>`;
    });
    renderToDOM('#store', domString);
  } else {
    emptyBooks();
  }
};

export { showBooksNotInOrder, emptyBooks };
