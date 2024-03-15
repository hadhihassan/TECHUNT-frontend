import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Signup, { INITIALSTATE } from './Slice/signupSlice';
import ClientReducer, { Client_INITIALSTATE } from './Slice/Client/clientSlice'
import conversationsSlice from "./Slice/conversationsSlice";
import { ConversationType } from './Slice/conversationsSlice'
const persistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'client',
};

const persistedReducer = persistReducer(persistConfig, Signup);
const persistedClient = persistReducer(persistConfig, ClientReducer);
const store = configureStore({
  reducer: {
    signup: persistedReducer,
    client: persistedClient,
    conversation: conversationsSlice
  },
});

export const persistor = persistStore(store)

export default store

export type ROOTSTORE = {
  signup: INITIALSTATE,
  client: Client_INITIALSTATE
  conversation: ConversationType
} 