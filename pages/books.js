import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyBooks = () => {
  const domString = '<h1>No Books</h1>';
  renderToDOM('#book-store', domString);
};

const showBooks = (array, shouldClear = true) => {
  if (shouldClear === true) {
    clearDom();

    const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-book-btn">Add A Book</button>';
    renderToDOM('#add-button', btnString);
  }
  if (array.length <= 0) {
    emptyBooks();
  } else {
    let domString = '';
    array.forEach((item) => {
      domString += `
      <div class="card">
        <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${item.title}</h5>
            <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fas fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
            <hr>
            <i class="btn btn-success" id="view-book-btn--${item.firebaseKey}"><span id="view-book-btn--${item.firebaseKey}" class="fas fa-eye"></span></i>
            <i id="edit-book-btn--${item.firebaseKey}" class="btn btn-info"><span id="edit-book-btn--${item.firebaseKey}" class="fas fa-edit"></span></i>
            <i id="delete-book-btn--${item.firebaseKey}" class="btn btn-danger"><span id="delete-book-btn--${item.firebaseKey}" class="fas fa-trash-alt"></span></i>
          </div>
        </div>`;
    });
    renderToDOM('#book-store', domString);
  }
};

export { showBooks, emptyBooks };
