import { createSlice } from '@reduxjs/toolkit'

export const addsSlice = createSlice({
    name: 'adds',
    initialState: {
        addsArray: []
    },
    reducers: {
        addAddsArray: (state, action) => {
            state.addsArray.push(action.payload)
        },
        clearAddsArray: (state) => {
            state.addsArray = []
        },
    },
})

export const {
    addAddsArray,
    clearAddsArray}= addsSlice.actions
    
export default addsSlice.reducer