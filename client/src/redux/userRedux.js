import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: null,
    registrationSuccess: false,
    loginSuccess: false,
  },
  reducers: {
    // login
    loginStart: (state, action) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.loginSuccess = true; 
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    resetLogin: (state) => {
      state.loginSuccess = false;
      state.error = null;
    },
    // register
    registerStart: (state) => {
      state.isFetching = true;
      state.error = null;
      state.registrationSuccess = false;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.registrationSuccess = true; // Set registration success 
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    // logout
    logoutSuccess: (state) => {
      state.currentUser = null; // Clear the user on logout
    },
    // reset registration
    resetRegistration: (state) => {
      state.registrationSuccess = false;
      state.error = null;
    },

  },
});

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logoutSuccess, resetRegistration, resetLogin } = userSlice.actions;
export default userSlice.reducer;