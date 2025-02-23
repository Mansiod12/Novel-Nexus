import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, role: "user" },
  reducers: {
    login(state) {
      state.isLoggedIn = true; // Fixed the missing assignment operator
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    changeRole(state, action) {
      state.role = action.payload; // Fixed assignment logic
    },
  },
});

export const authActions = authSlice.actions; // Corrected the assignment to authActions
export default authSlice.reducer;
