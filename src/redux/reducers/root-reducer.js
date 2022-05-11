import { combineReducers } from "redux";
import customer from "./customer-reducer";
import test from "./test-reducer";
import user from "./user-reducer";
import category from "./category-reducer";
import product from "./product-reducer";

export default combineReducers({
  customer,
  test,
  user,
  category,
  product
});
