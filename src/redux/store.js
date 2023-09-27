import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import userReducer from './user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  // PERSISTED VALUES ============ //
  whitelist: ['userData', 'tasks'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
});

export const persistor = persistStore(store);
