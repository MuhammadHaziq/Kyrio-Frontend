import settingsReducer from "./settingsReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import itemReducer from "./items/itemReducer";
import categoryReducer from "./items/categoryReducer";
import discountReducer from "./items/discountReducer";
import storeReducer from "./settings/storeReducer";
import posDeviceReducer from "./settings/posDeviceReducer";
import diningOptionReducer from "./settings/diningOptionReducer";
import taxesReducer from "./settings/taxesReducer";
import kitchenPrinterReducer from "./settings/kitchenPrinterReducer";
import paymentTypesReducer from "./settings/paymentTypesReducer";
import loyaltyReducer from "./settings/loyaltyReducer";
import featuresReducer from "./settings/featuresReducer";
import receiptReducer from "./settings/receiptReducer";
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
});
const settingReducers = combineReducers({
  featuresReducer,
  paymentTypesReducer,
  loyaltyReducer,
  taxesReducer,
  kitchenPrinterReducer,
  diningOptionReducer,
  storeReducer,
  posDeviceReducer,
  receiptReducer,
});
const rootReducer = combineReducers({
  settings: settingsReducer,
  auth: authReducer,
  msg: messageReducer,
  items,
  settingReducers,
});

export default persistReducer(persistConfig, rootReducer);
