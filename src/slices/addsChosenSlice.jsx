import { createSlice } from '@reduxjs/toolkit'

export const addsChosenSlice = createSlice({
    name: 'addsChosen',
    initialState: {
        addsChosen: []
    },
    reducers: {
        setAddsChosen: (state, action) => {
            state.addsChosen = action.payload
        },
        addAddsChosen: (state, action) => {
            state.addsChosen.push(state, action)
        },
        excludeAddsChosen: (state, action) => {
            state.addsChosen.splice(state.addsChosen.indexOf(action.payload), 1)
        },
        popAddsChosen: (state) => {
            state.addsChosen = []
        }
    },
})

export const {
    setAddsChosen,
    addAddsChosen,
    excludeAddsChosen,
    popAddsChosen}= addsChosenSlice.actions
    
export default addsChosenSlice.reducer