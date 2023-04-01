import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Status {
  isSaved: boolean
}

interface SaveStatusState {
  value: Status[]
}
const initialState: SaveStatusState = { value: [] }

const saveStatusSlice = createSlice({
  name: "saveStatus",
  initialState,
  reducers: {
      setStatus: (state: SaveStatusState , action: PayloadAction<Status>) => {
        state.value.push(action.payload);
      }
  }
})

export const { setStatus } = saveStatusSlice.actions;
export default saveStatusSlice;