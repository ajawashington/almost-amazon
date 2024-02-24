import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyAuthors = () => {
  const domString = '<h1>No Authors</h1>';
  renderToDOM('#store', domString);
};

const showAuthors = (array, shouldClear = true) => {
  if (shouldClear === true) {
    clearDom();

    const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-author-btn">Add An Author</button>';
    renderToDOM('#add-button', btnString);
  }
  if (array.length <= 0) {
    emptyAuthors();
  } else {
    let domString = '';
    array.forEach((item) => {
      domString += `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${item.first_name} ${item.last_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${item.email}</h6>
        <hr>
        <i class="btn btn-success" id="view-author-btn--${item.firebaseKey}"><span id="view-author-btn--${item.firebaseKey}" class="fas fa-eye"></span></i>
        <i class="btn btn-info" id="update-author--${item.firebaseKey}"><span id="edit-author-btn--${item.firebaseKey}" class="fas fa-edit"></span></i>
        <i class="btn btn-danger" id="delete-author-btn--${item.firebaseKey}"><span id="delete-author-btn--${item.firebaseKey}" class="fas fa-trash-alt"></span></i>
      </div>
    </div>
    `;
    });
    renderToDOM('#author-store', domString);
  }
};

export { showAuthors, emptyAuthors };
