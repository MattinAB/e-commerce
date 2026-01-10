import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  name: string;
  email: string;
  password: string;
  loading: boolean;
  error: string;
}
const initialState: AuthState = {
  name: "",
  email: "",
  password: "",
  loading: true,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setName, setPassword, setLoading, setError, setEmail } =
  authSlice.actions;
export default authSlice.reducer;
