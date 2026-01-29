import { policiesApi } from "@/features/policies/api/policiesApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [policiesApi.reducerPath]: policiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(policiesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;