import { configureStore } from '@reduxjs/toolkit';
import submissionsReducer from './submissionsSlice';

export const store = configureStore({
  reducer: {
    submissions: submissionsReducer,
  },
});
