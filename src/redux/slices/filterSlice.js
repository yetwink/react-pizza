import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sort: {
        id: 0,
        name: 'популярности',
        sortProperty: 'rating'
    }
}


const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
        },
        setSortType: (state, action) => {
            state.sort = action.payload;
        }
    }
})


export const { setCategoryId, setSortType } = filterSlice.actions

export default filterSlice.reducer

