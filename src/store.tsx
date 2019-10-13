import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import mainReducer from "./redux/reducers";

// Persist Middleware for react redux
const persistConfig = {
    key: "parser",
    storage,
};
const persistedReducer = persistReducer(persistConfig, mainReducer);
export const store = createStore(persistedReducer, {}, applyMiddleware(thunk, logger));
export const persistor = persistStore(store, null);
