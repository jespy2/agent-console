import { configureStore } from "@reduxjs/toolkit";
import { policiesApi } from "@/features/policies/api/policiesApi";
import { policiesUiReducer } from "@/features/policies/state/policiesUiSlice";

export const store = configureStore({
  reducer: {
    policiesUi: policiesUiReducer,
    [policiesApi.reducerPath]: policiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(policiesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;