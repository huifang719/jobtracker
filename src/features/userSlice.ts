import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserStateValue {
    email: string | null;
}
interface UserState {
    value: UserStateValue;
}
const initialState = { value: { email: null } } as UserState

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<UserStateValue>) => {
            state.value = action.payload;
        },
        removeUser: (state: UserState,action: PayloadAction<UserStateValue>) => {
          state.value = action.payload;
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice;