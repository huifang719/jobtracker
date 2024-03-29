import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Job from "../Jobs";

interface jobState {
  value: Job[] 
}
const initialState: jobState = { value: [] }

const savedJobListSlice = createSlice({
  name: "Job",
  initialState,
  reducers: {
    setSavedJob: (state: jobState, action: PayloadAction<Job[]>) => {
        state.value = action.payload;
      },
  }
})

export const { setSavedJob } = savedJobListSlice.actions;
export default savedJobListSlice;