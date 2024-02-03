import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import noteReducer from '../features/notes/noteSlice'; // Adjust the import path as necessary
import userReducer from '../features/users/userSlice'; // Adjust the import path as necessary

// Define the persistence configurations for the notes and users slices
const notesPersistConfig = {
    key: 'notes',
    storage,
};

const usersPersistConfig = {
    key: 'users',
    storage,
};

// Use `persistReducer` with the configurations and the corresponding reducers
const persistedNoteReducer = persistReducer(notesPersistConfig, noteReducer);
const persistedUserReducer = persistReducer(usersPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    notes: persistedNoteReducer, // Persisted notes slice
    users: persistedUserReducer, // Persisted users slice
    // ...add other reducers if necessary
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
