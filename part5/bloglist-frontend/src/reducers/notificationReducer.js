import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",   
    initialState: { message: '', type: '' },
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return { message: '', type: '' }
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions


export const setNotificationWithTimeout = (message, type, time) => {
    return async dispatch => {
        dispatch(setNotification({ message, type }))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer