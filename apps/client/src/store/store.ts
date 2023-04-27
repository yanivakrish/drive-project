import { configureStore } from '@reduxjs/toolkit';

import { filesReducer } from './slices';

export const store = configureStore({
  reducer: {
    files: filesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
