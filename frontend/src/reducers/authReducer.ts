import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../types/auth";

const initialState : AuthState = {
    user : null,
    token : null
} 

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {
        loginSuccess : (state, action: PayloadAction<{ token: string; user: User }>) => {
            state.token = action.payload.token
            state.user = action.payload.user
        },

        logout : (state) => {
            state.token = null
            state.user = null
        }
    }

})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer