import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';

// USING THIS FORM FOR BOTH CREATE AND UPDATE
const addOrderForm = (obj = {}) => {
  clearDom();
  const domString = `
    <form id="${obj.firebaseKey ? `update-order--${obj.firebaseKey}` : 'submit-order'}" class="mb-4">
      <div class="form-group">
        <label for="title">Order Title</label>
        <input type="text" class="form-control" id="title" aria-describedby="orderTitle" placeholder="Enter Order Title" value="${obj.title || ''}" required>
      </div>
      <div class="form-group">
        <label for="customerFirstName">Customer First Name</label>
        <textarea class="form-control" placeholder="Customer First Name" id="customerFirstName" style="height: 100px">${obj.customer_first_name || ''}</textarea>
      </div>
      <div class="form-group">
      <label for="customerLastName">Customer Last Name</label>
      <textarea class="form-control" placeholder="Customer Last Name" id="customerLastName" style="height: 100px">${obj.customer_last_name || ''}</textarea>
    </div>
      <div class="form-group">
        <label for="notes">Notes</label>
        <textarea class="form-control" placeholder="Order Notes" id="notes" style="height: 100px">${obj.notes || ''}</textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit Order
      </button>
    </form>`;

  renderToDOM('#form-container', domString);
};

export default addOrderForm;
