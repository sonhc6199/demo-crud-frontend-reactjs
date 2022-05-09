const apiBase = "http://localhost:3000/api";

module.exports = {
  getDataCustomer: apiBase + "/get-data-customer",
  addCustomer: apiBase + "/add-customer",
  deleteCustomer: apiBase + "/delete-customer",
  roles: apiBase + "/roles",
  users: apiBase + "/users",
  // category
  getDataCategory: apiBase + "/category/get-data",
  addCategory: apiBase + "/category/add",
  updateCategory: apiBase + "/category/update",
  deleteCategory: apiBase + "/category/delete",
};
