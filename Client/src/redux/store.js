// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Persist config
const persistConfig = {
  key: 'root',         // Key for storage
  storage,             // Use localStorage
};

// Combine reducers if needed
const rootReducer = combineReducers({
  user: userReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
});

// Persistor for PersistGate
export const persistor = persistStore(store);
