import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';

const addOrderForm = (obj = {}) => {
  clearDom();
  const domString = `
    <form id="${obj.firebaseKey ? `update-order--${obj.firebaseKey}` : 'submit-order'}" class="mb-4">
      <div class="form-group">
        <label for="image">Customer Name</label>
        <input type="text" class="form-control" id="customer_name" placeholder="Customer Name" value="${obj.customer_name || ''}" required>
      </div>
      <div class="form-group">
        <label for="title">Email</label>
        <input type="email" class="form-control" id="email" aria-describedby="Email" placeholder="Enter Email" value="${obj.email || ''}"required>
      </div>
    <div>
    <label for="orderType">Select an Order Type</label>
    <select class="form-control" id="order_type" required>
    <option value="">Select an Order Type</option>
    <option value="In-Person">In-Person</option>
    <option value="Online">Online</option>
    </select>
    </div>
      <button type="submit" class="btn btn-primary mt-3">Submit Order</button>
    </form>`;

  renderToDOM('#form-container', domString);
};

export default addOrderForm;
