import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "activeCategory",
    initialState: {
        category: "All"
    },
    reducers:{
        categorySet: (state,action)=>{
            state.category = action.payload;
        },
        
    }
})

export const {categorySet} = categorySlice.actions;
export default categorySlice.reducer