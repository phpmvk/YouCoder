import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const rootUser = {
  shortName: '',
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
      const shortName = action.payload.user.display_name.split(' ')[0];
      return { ...action.payload.user, shortName: shortName };
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
