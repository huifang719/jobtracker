import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Job {
  title: string;
  location: string;
  description: string;
  url: string
}

interface jobState {
  value: Job[] 
}
const initialState: jobState = { value: [] }

const jobSlice = createSlice({
  name: "Job",
  initialState,
  reducers: {
      listingJob: (state: jobState, action: PayloadAction<Job>) => {
        state.value.push(action.payload);
      },
      reset: (state: jobState) => {
        state = initialState;
    }
  }
})

export const { listingJob, reset } = jobSlice.actions;
export default jobSlice;