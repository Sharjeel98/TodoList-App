import { createSlice } from '@reduxjs/toolkit';
import { navigationRef } from '../routes';

// SLICE DESCRIPTION // REDUCERS
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    tasks: [],
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
  },
});

export const { setUserData, setAppLoader, setTasks } = userSlice.actions;
export default userSlice.reducer;
