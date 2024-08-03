import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        email: '',
        role: ''
    },
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
        setEmail: (state, action) => {
            //localStorage.setItem('email', action.payload)
            state.email = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.email = '';
            state.role = '';
        },
        init:()=> {
            if (localStorage.getItem('email'))
            setEmail(localStorage.getItem('email'))
        }
    }
});

export const { setAuthenticated, setEmail, logout, init } = authSlice.actions;

export default authSlice.reducer;
