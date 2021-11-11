import settingsReducer from "./settingsReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import filterComponentReducer from "./dashboard/filterComponentReducer";
import salesSummaryReducer from "./dashboard/salesSummaryReducer";
import salesItemReducer from "./reports/salesItemReducer";
import salesCategoryReducer from "./reports/salesCategoryReducer";
import salesModifierReducer from "./reports/salesModifierReducer";
import salesEmployeeReducer from "./reports/salesEmployeeReducer";
import salesPaymentTypeReducer from "./reports/salesPaymentTypeReducer";
import salesReceiptReducer from "./reports/salesReceiptReducer";
import salesDiscountReducer from "./reports/salesDiscountReducer";
import salesShiftReducer from "./reports/salesShiftReducer";
import salesTaxesReducer from "./reports/salesTaxesReducer";
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
import accountReducer from "./account/accountReducer";
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
});
const reports = combineReducers({
  salesSummaryReducer,
  salesItemReducer,
  salesCategoryReducer,
  salesEmployeeReducer,
  salesPaymentTypeReducer,
  salesReceiptReducer,
  salesModifierReducer,
  salesDiscountReducer,
  salesShiftReducer,
  salesTaxesReducer,
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
  account: accountReducer,
  settings: settingsReducer,
  auth: authReducer,
  msg: messageReducer,
  dashBoard,
  reports,
  items,
  settingReducers,
  customerReducers,
  employeeReducers,
});

export default persistReducer(persistConfig, rootReducer);
