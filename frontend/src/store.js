import { configureStore } from '@reduxjs/toolkit';
import newReducer from './features/newSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, newReducer);

export const store = configureStore({
  reducer: {
    navigation: persistedReducer,
  },
  middleware: [thunk],
})

export const persistor = persistStore(store);