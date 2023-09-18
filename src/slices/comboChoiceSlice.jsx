import { createSlice } from '@reduxjs/toolkit'

export const comboChoiceSlice = createSlice({
    name: 'comboChoice',
    initialState: {
        choiceArray: []
    },
    reducers: {
        setChoiceArray: (state, action) => {
            state.choiceArray = action.payload
        },
        clearChoiceArray: (state) => {
            state.choiceArray = []
        },
    },
})

export const {
    setChoiceArray,
    clearChoiceArray}= comboChoiceSlice.actions
    
export default comboChoiceSlice.reducer