import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../types/auth";

const initialState: AuthState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
            state.token = action.payload.token
            state.user = action.payload.user
        },

        logout: (state) => {
            state.token = null
            state.user = null
        },
        updateUser: (state, action: PayloadAction<{ avatar?: string, username: string }>) => {
            if (state.user) {
                state.user.avatar = action.payload.avatar ?? state.user.avatar
                state.user.username = action.payload.username
            }
        }
    }

})

export const { loginSuccess, logout, updateUser } = authSlice.actions
export default authSlice.reducer