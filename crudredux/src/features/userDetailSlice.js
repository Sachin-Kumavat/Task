import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk("createUser", async(data)=>{
    const resonse = await fetch("https://675696ef11ce847c992d53c5.mockapi.io/crud", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    try {
        const result = await resonse.json();
        return result;
    } catch (error) {
        console.log(error);   
    }
})

export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false
    },
    reducers: {

    },
    extraReducers: (builder)=> {
        builder
        .addCase(createUser.pending, (state)=>{
            state.loading=true
        })
        .addCase(createUser.fulfilled, (state, action)=>{
            state.loading=false;
            state.users.push(action.payload)
        })
        .addCase(createUser.rejected, (state, action)=>{
            state.loading=false;
            state.users = action.payload;
        })
        // [createUser.pending] : (state)=>{
        // },
        // [createUser.fulfilled] : (state, action)=>{
        //     state.loading=false;
        //     state.users.push(action.payload)
        // },
        // [createUser.rejected] : (state, action)=>{
        //     state.loading=false;
        //     state.users = action.payload;
        // }
    }
})

export default userDetail.reducer;