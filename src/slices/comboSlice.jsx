import { createSlice } from '@reduxjs/toolkit'

export const comboSlice = createSlice({
    name: 'combo',
    initialState: {
        comboArray: []
    },
    reducers: {
        setComboArray: (state, action) => {
            state.comboArray = action.payload
        },
        addItemComboArray: (state, action) => {
            state.comboArray.push(action.payload)
        },
        excludeItemComboArray: (state, action) => {
            state.comboArray.splice(state.comboArray.indexOf(action.payload), 1)
        },
        clearComboArray: (state) => {
            state.comboArray = []
        }
        
    },
})

export const {
    setComboArray,
    addItemComboArray,
    excludeItemComboArray,
    clearComboArray}= comboSlice.actions
    
export default comboSlice.reducer