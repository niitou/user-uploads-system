import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastState } from "../types/toast";

const initialState: ToastState = {
    message: "",
    type: "success",
    visible: false
}

const toastSlice = createSlice({
    name : 'toast',
    initialState,
    reducers : {
        showToast : (state, action: PayloadAction<{message : string, type: ToastState['type']}>) => {
            state.message = action.payload.message
            state.type = action.payload.type
            state.visible = true
        },
        hideToast : (state) => {
            state.visible = false
        }
    }
})

export const {showToast, hideToast} = toastSlice.actions
export default toastSlice.reducer