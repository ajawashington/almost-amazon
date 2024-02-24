import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  clearDom();
  let domString = '';
  domString += `
  <div class="mt-5 d-flex flex-wrap">
  <div class="mt-5 d-flex flex-wrap">
   <div class="d-flex flex-column">
   </div>
   <div class="text-white ms-5 details">
   <h5>${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
   Author Email: <a href="mailto:${obj.email}">${obj.email}</a>
   </div>
   <div class="mt-5">
     <i id="edit-author-btn--${obj.firebaseKey}" class="fas fa-edit btn btn-info"></i>
     <i id="delete-author--${obj.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
   </div>
    </div>`;

  obj.books.forEach((item) => {
    domString += `
    <div class="card">
    <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 200px;">
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

  domString += '</div>';

  renderToDOM('#view', domString);
};

export default viewAuthor;
