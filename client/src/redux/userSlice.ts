import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const rootUser = {
  uid: '',
  displayName: '',
  email: '',
  join_date: '',
  recordings: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: rootUser,
  reducers: {
    setUser: (_state, action) => {
      return action.payload;
    },
    removeUser: (_state, _action) => {
      return rootUser;
    },
    editUser: (state, action: PayloadAction<typeof rootUser>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUser, removeUser, editUser } = userSlice.actions;

export default userSlice.reducer;
