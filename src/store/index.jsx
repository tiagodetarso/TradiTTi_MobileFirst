/* eslint-disable react-refresh/only-export-components */
import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import orderReducer from '../slices/orderSlice'
import searchReducer from '../slices/searchSlice'
import selectedReducer from '../slices/selectedSlice'
import addsReducer from '../slices/addsSlice'
import addsChosenReducer from '../slices/addsChosenSlice'
import comboReducer from '../slices/comboSlice'
import comboChoiceReducer from '../slices/comboChoiceSlice'
import deliveryInfoReducer from '../slices/deliveryInfoSlice'

const logger = createLogger()

const middleware = [logger]

export default configureStore({
    reducer: {
        order: orderReducer,
        search: searchReducer,
        selected: selectedReducer,
        adds: addsReducer,
        addsChosen: addsChosenReducer,
        combo: comboReducer,
        comboChoice: comboChoiceReducer,
        delivery: deliveryInfoReducer
    }
})