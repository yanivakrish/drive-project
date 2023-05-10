import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserInfo {
  email: string;
}

const initialState: UserInfo = {
  email: '',
};

export const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {
    setEmail: (state, { payload: { email } }: PayloadAction<UserInfo>) => {
      state.email = email;
    },
  },
});

export const { setEmail } = userInfoSlice.actions;

export const userInfoReducer = userInfoSlice.reducer;
