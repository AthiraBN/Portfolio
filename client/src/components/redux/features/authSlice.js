import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api";

export const login = createAsyncThunk("auth/login", async({userDtls, navigate, toast}) => {

    console.log(userDtls);

    try {
        const response = await api.signIn(userDtls);
        toast.success("Login successful!");
        navigate("/dashboard")
    } 
    catch(err) { console.log(err); }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: "",
        loading: false
    },
    extraReducers: {
        [login.pending] : (state, action) => {
            state.loading = true;
        },
        [login.fulfilled] : (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [login.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
 });

 export default authSlice.reducer;