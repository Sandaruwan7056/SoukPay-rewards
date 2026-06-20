import { AuthState } from "@/src/types/auth.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string, user?: AuthState["user"] }>
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },

    updateUserProfile: (
      state,
      action: PayloadAction<NonNullable<AuthState["user"]>>
    ) => {
      state.user = action.payload;
    },

    deductPoints: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.pointsBalance -= action.payload;
      }
    },

    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setCredentials, logout, deductPoints, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;