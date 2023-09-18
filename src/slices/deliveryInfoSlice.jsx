import { createSlice } from '@reduxjs/toolkit'

export const deliveryInfoSlice = createSlice({
    name: 'delivery',
    initialState: {
        info:{
            receiveWay: "",
            payment: "",
            paymentChange: 0,
            clientName: "",
            street: "",
            placeNumber: "",
            adressComplement: "",
            referencePoint:"",
            neighborhood:""
        },
    },
    reducers: {
        setDeliveryInfo: (state, action) => {
            state.info = action.payload
        },
        clearDeliveryInfo: (state) => {
            state.info = {}
        }
    },
})

export const {
    setDeliveryInfo,
    clearDeliveryInfo}= deliveryInfoSlice.actions
    
export default deliveryInfoSlice.reducer