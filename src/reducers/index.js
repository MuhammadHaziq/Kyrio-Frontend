import settingsReducer from "./settingsReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import filterComponentReducer from "./dashboard/filterComponentReducer";
import salesSummaryReducer from "./dashboard/salesSummaryReducer";
import salesCategoryReducer from "./reports/salesCategoryReducer";
import salesEmployeeReducer from "./reports/salesEmployeeReducer";
import salesPaymentTypeReducer from "./reports/salesPaymentTypeReducer";
import itemReducer from "./items/itemReducer";
import categoryReducer from "./items/categoryReducer";
import discountReducer from "./items/discountReducer";
import modifiresReducer from "./items/modifiresReducer";
import storeReducer from "./settings/storeReducer";
import posDeviceReducer from "./settings/posDeviceReducer";
import diningOptionReducer from "./settings/diningOptionReducer";
import diningOptionReducer2 from "./settings/diningOptionReducer2";
import taxesReducer from "./settings/taxesReducer";
import kitchenPrinterReducer from "./settings/kitchenPrinterReducer";
import paymentTypesReducer from "./settings/paymentTypesReducer";
import loyaltyReducer from "./settings/loyaltyReducer";
import featuresReducer from "./settings/featuresReducer";
import receiptReducer from "./settings/receiptReducer";
import customerReducer from "./customer/customerReducer";
import employeeListReducer from "./employee/employeeListReducer";
import timeCardReducer from "./employee/timeCardReducer";
import userRolesReducer from "./employee/userRolesReducer";
import openTicketReducer from "./settings/openTicketReducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "primary",
  storage,
  whitelist: ["settings", "auth", "msg"],
};
const items = combineReducers({
  itemReducer,
  categoryReducer,
  discountReducer,
  modifiresReducer,
});
const dashBoard = combineReducers({
  filterComponentReducer,
  salesSummaryReducer,
});
const reports = combineReducers({
  salesCategoryReducer,
  salesCategoryReducer,
  salesPaymentTypeReducer,
});

const settingReducers = combineReducers({
  featuresReducer,
  paymentTypesReducer,
  loyaltyReducer,
  openTicketReducer,
  taxesReducer,
  kitchenPrinterReducer,
  diningOptionReducer,
  diningOptionReducer2,
  storeReducer,
  posDeviceReducer,
  receiptReducer,
});
const customerReducers = combineReducers({
  customerReducer,
});
const employeeReducers = combineReducers({
  employeeListReducer,
  userRolesReducer,
  timeCardReducer,
});
const rootReducer = combineReducers({
  settings: settingsReducer,
  auth: authReducer,
  msg: messageReducer,
  dashBoard,
  items,
  settingReducers,
  customerReducers,
  employeeReducers,
});

export default persistReducer(persistConfig, rootReducer);
