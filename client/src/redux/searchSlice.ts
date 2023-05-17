import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
  searchTriggered: boolean;
}

const initialState: SearchState = {
  searchTerm: '',
  searchTriggered: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSearchTriggered: (state, action: PayloadAction<boolean>) => {
      state.searchTriggered = action.payload;
    },
  },
});

export const { setSearchTerm, setSearchTriggered } = searchSlice.actions;

export default searchSlice.reducer;
