import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: "loading",
}


export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizzaStatus',
    async ({currentPage,categoryUrl,sortByType, search}) => {
        let url = `https://6758ac5360576a194d1170aa.mockapi.io/items?page=${currentPage}&limit=4${categoryUrl}&sortBy=${sortByType}&order=asc${search}`
        const response = await axios.get(url)
        return response.data
    },
)



const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas: (state, action) => {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state) => {
            state.status = 'loading'
        })
                .addCase(fetchPizza.fulfilled, (state, action) => {
                    state.items = action.payload
                    state.status = 'success'
                })
                .addCase(fetchPizza.rejected, (state, action) => {
                    state.status = 'error'
                    state.items = []
                })
    },

})


export const {
    setPizzas,
} = pizzaSlice.actions

export default pizzaSlice.reducer
