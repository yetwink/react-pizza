import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload.id)

            if(findItem){
                findItem.count++
                state.totalPrice += findItem.price
            } else {
                state.totalPrice += action.payload.price
                 state.items.push({
                     ...action.payload,
                     count: 1,
                 });
            }
        },
        decreaseItem: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if(findItem.count > 0){
                state.totalPrice -= findItem.price
                findItem.count--
            }
            if(findItem.count < 1){
                state.items = state.items.filter(obj => obj.id !== action.payload)
            }
        },
        removeItem: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload);
            state.items = state.items.filter(obj => obj.id !== findItem.id);
            state.totalPrice -= findItem.count * findItem.price;
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        }
    }
})


export const { addItem, decreaseItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer

