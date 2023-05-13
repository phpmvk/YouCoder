import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingSpinnerState {
  showLoadingSpinner: boolean;
}

const initialState: LoadingSpinnerState = {
  showLoadingSpinner: false,
};

const loadingSpinnerSlice = createSlice({
  name: 'loadingSpinner',
  initialState,
  reducers: {
    setShowLoadingSpinner: (state, action: PayloadAction<boolean>) => {
      state.showLoadingSpinner = action.payload;
    },
  },
});

export const { setShowLoadingSpinner } = loadingSpinnerSlice.actions;

export default loadingSpinnerSlice.reducer;
