import {configureStore} from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import toastReducer from './reducers/toastReducer'
import logger from 'redux-logger'

export const store = configureStore({
    reducer : {
        auth: authReducer,
        toast: toastReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
