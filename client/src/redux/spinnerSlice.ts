import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingSpinnerState {
  loadingSpinner: boolean;
}

const initialState: LoadingSpinnerState = {
  loadingSpinner: false,
};

const loadingSpinnerSlice = createSlice({
  name: 'loadingSpinner',
  initialState,
  reducers: {
    setLoadingSpinner: (state, action: PayloadAction<boolean>) => {
      state.loadingSpinner = action.payload;
    },
  },
});

export const { setLoadingSpinner } = loadingSpinnerSlice.actions;

export default loadingSpinnerSlice.reducer;
