import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./layoutSlice";

// Création du store
export const store = configureStore({
  reducer: {
    layout: layoutReducer,
  },
});

// Types utiles pour TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
