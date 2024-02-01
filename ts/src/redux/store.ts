import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Login,{ INITIALSTATE } from './Slice/signup.js/signupSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, Login);
const store = configureStore({
  reducer: {
    signup: persistedReducer,
  },
});

export const persistor = persistStore(store)

export default store

export type ROOTSTORE = {
  signup: INITIALSTATE
} 