import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Creator } from '../types/Creator';

type UserState = Creator & { shortName: string };
export const rootUser: UserState = {
  shortName: '',
  uid: '',
  display_name: '',
  email: '',
  join_date: '',
  recordings: [],
};

/*
setUser: (_state, action: PayloadAction<{ user: Creator }>) => {
  const shortName = action.payload.user.display_name?.split(' ')[0] || '';
  return { ...action.payload.user, shortName: shortName } as UserState;
},
editUser: (state, action: PayloadAction<UserState>) => {
  return {
    ...state,
    ...action.payload,
  };
},

*/

export const userSlice = createSlice({
  name: 'user',
  initialState: rootUser,
  reducers: {
    setUser: (_state, action: PayloadAction<{ user: Creator }>) => {
      const shortName = action.payload.user.display_name?.split(' ')[0] || '';
      return { ...action.payload.user, shortName: shortName } as UserState;
    },
    removeUser: (_state, _action) => {
      return rootUser;
    },
    editUser: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUser, removeUser, editUser } = userSlice.actions;

export default userSlice.reducer;
