import { createSlice } from '@reduxjs/toolkit';
import { navigationRef } from '../routes';


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    tasks: [],
    categories: [],
    appLoader: false
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action?.payload
    },
    setAppLoader: (state, action) => {
      state.appLoader = action?.payload
    },
    setTasks: (state, action) => {
      state.tasks = action?.payload
    },
    setCategories: (state, action) => {
      state.categories = action?.payload
    },
  },
});

export const { setUserData, setAppLoader, setTasks,setCategories } = userSlice.actions;
export default userSlice.reducer;
