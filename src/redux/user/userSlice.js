import { createSlice } from "@reduxjs/toolkit";
import { getUserData, setUserData } from "../../utils/authStorage";

const initialState = {
  value: 0,
  token: getUserData().token,
  userData: getUserData().userName,
  role: getUserData().userId
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setUserDetails: (state, action) => {

      setUserData({
        userName: action.payload.userName,
        token: action.payload.token,
        userId : action.payload.userId
      });

      state.userName = action.payload.userName;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },

    clearUserDetails: (state) => {
      state.userName = null;
      state.token = null;
    },

  },
});

export const {setUserDetails, clearUserDetails} = userSlice.actions;
export default userSlice.reducer;
