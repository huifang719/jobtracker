import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice';
import jobSlice from './features/jobSlice';
import savedJobListSlice from './features/savedJobList';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    job: jobSlice.reducer,
    savedJob: savedJobListSlice.reducer
  },
})

