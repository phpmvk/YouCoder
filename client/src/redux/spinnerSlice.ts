import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingSpinnerState {
  loadingSpinner: boolean;
  loadingPage: boolean;
}

const initialState: LoadingSpinnerState = {
  loadingSpinner: false,
  loadingPage: false,
};

const loadingSpinnerSlice = createSlice({
  name: 'loadingSpinner',
  initialState,
  reducers: {
    setLoadingSpinner: (state, action: PayloadAction<boolean>) => {
      state.loadingSpinner = action.payload;
    },
    setLoadingPage: (state, action: PayloadAction<boolean>) => {
      state.loadingPage = action.payload;
    },
  },
});

export const { setLoadingSpinner, setLoadingPage } =
  loadingSpinnerSlice.actions;

export default loadingSpinnerSlice.reducer;
