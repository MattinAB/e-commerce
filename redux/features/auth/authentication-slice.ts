import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  name: string;
  email: string;
  loading: boolean;
  error: string;
  role: string | null;
}
const initialState: AuthState = {
  name: "",
  email: "",
  loading: true,
  error: "",
  role: null,
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

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setRole(state, action: PayloadAction<string | null>) {
      state.role = action.payload;
    },
  },
});

export const { setName, setLoading, setError, setEmail, setRole } =
  authSlice.actions;
export default authSlice.reducer;
