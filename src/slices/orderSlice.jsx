import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderItems:[{
            id: '',
            subtype: '',
            specification: '',
            unity: '',
            value: 0,
            fixPromotionDay: 7,
            promotionValue: 0,
            quantity:0,
            extra:[],
            combo:[]
        }],
    },
    reducers: {
        addItem: (state, action) => {
            state.orderItems.push(action.payload)
        },
        excludeItem: (state, action) => {
            state.orderItems.splice(state.orderItems.indexOf(action.payload), 1)
        },
    },
})

export const {
    addItem,
    excludeItem}= orderSlice.actions
    
export default orderSlice.reducer