import { configureStore } from '@reduxjs/toolkit';

import { serverApi } from './services';
import { userInfoReducer } from './slices';

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    [serverApi.reducerPath]: serverApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
