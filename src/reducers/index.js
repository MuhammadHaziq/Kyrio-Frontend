import settingsReducer from "./settingsReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import itemReducer from "./itemReducer";
import categoryReducer from "./categoryReducer";
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
});
const rootReducer = combineReducers({
  settings: settingsReducer,
  auth: authReducer,
  msg: messageReducer,
  items,
});

export default persistReducer(persistConfig, rootReducer);
