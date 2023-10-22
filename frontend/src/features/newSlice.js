import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainNavBar: "",
  childNavBar: "login",
  isLogin: false,
}

export const newSlice = createSlice ({
  name: 'navigation',
  initialState,
  reducers: {
    mainHome: (state) => {
      state.mainNavBar = ""
    },
    mainContact: (state) => {
      state.mainNavBar = "contact"
    },
    mainPosting: (state) => {
      state.mainNavBar = "posting"
    },
    mainAbout: (state) => {
      state.mainNavBar = "about"
    },
    mainLogin: (state) => {
      state.mainNavBar = "login"
    },
    childLogin: (state) => {
      state.childNavBar = "login"
    },
    childRegister: (state) => {
      state.childNavBar = "register"
    },
    changeStatusLogin: (state) => {
      state.isLogin = !state.isLogin;
    },
  },
})

export const { 
  mainHome, mainContact, mainPosting, mainAbout, mainLogin,
  childLogin, childRegister, changeStatusLogin
} = newSlice.actions;

export default newSlice.reducer;