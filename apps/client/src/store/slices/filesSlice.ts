import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  name: string;
}

const initialState: InitialState = { name: 'hello' };

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = filesSlice.actions;
export const filesReducer = filesSlice.reducer;
