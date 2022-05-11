const apiBase = "http://localhost:4000/api";

module.exports = {
  getDataCustomer: apiBase + "/get-data-customer",
  addCustomer: apiBase + "/add-customer",
  deleteCustomer: apiBase + "/delete-customer",
  roles: apiBase + "/roles",
  users: apiBase + "/users",
  // category
  getDataCategory: apiBase + "/category/get-data",
  addCategory: apiBase + "/category/add",
  editCategory: apiBase + "/category/edit",
  deleteCategory: apiBase + "/category/delete",
  // product
  getDataProduct: apiBase + "/product/get-data",
  addProduct: apiBase + "/product/add",
  editProduct: apiBase + "/product/edit",
  deleteProduct: apiBase + "/product/delete",
};
