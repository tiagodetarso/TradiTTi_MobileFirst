import { createSlice } from '@reduxjs/toolkit'

export const selectedSlice = createSlice({
    name: 'selected',
    initialState: {
        product: {}
    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload
        },
    },
})

export const {
    setProduct}= selectedSlice.actions
    
export default selectedSlice.reducer