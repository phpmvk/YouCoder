import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Creator, Recording } from '../types/Creator';
import { PURGE } from 'redux-persist';

type UserState = Creator & { shortName: string };
export const rootUser: UserState = {
  shortName: '',
  uid: '',
  display_name: '',
  email: '',
  join_date: '',
  recordings: [],
};

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
    updateUserRecording: (
      state,
      action: PayloadAction<{ recording: Recording }>
    ) => {
      const updatedRecording = action.payload.recording;
      const index = state.recordings!.findIndex(
        (recording) => recording.recording_id === updatedRecording.recording_id
      );

      if (index !== -1) {
        state.recordings![index] = updatedRecording;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      Object.assign(state, rootUser);
    });
  },
});

export const { setUser, removeUser, editUser, updateUserRecording } =
  userSlice.actions;

export default userSlice.reducer;
