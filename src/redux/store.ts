import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice"; // Ensure this is a valid reducer
// You typically don't need to import thunk since it's included by default
// import thunk from "redux-thunk"; 

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks if needed
    }) // No need to append thunk unless you have specific reasons
});

// Define custom hooks for using dispatch and selector with proper types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;