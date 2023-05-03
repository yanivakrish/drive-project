import { configureStore } from '@reduxjs/toolkit';

import { filesReducer } from './slices';
import { serverApi } from './services';

export const store = configureStore({
  reducer: {
    files: filesReducer,
    [serverApi.reducerPath]: serverApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
