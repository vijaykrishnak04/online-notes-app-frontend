// src/features/users/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../core/entities/User";
import {
  UserCredentials,
  UserRegistration,
  AuthToken,
} from "../../core/interfaces/IUserRepository";
import { UserRepository } from "../../adapters/repositories/UserRepository"; // Adjust the import paths as necessary

// Define the initial state of the user slice
interface UserState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

// Async thunks
const userRepository = new UserRepository();

export const login = createAsyncThunk(
  "users/login",
  async (credentials: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await userRepository.login(credentials);
      // Optionally, store the token in localStorage or a cookie here
      return response;
    } catch (err) {
      return rejectWithValue(
        "Login failed. Please check your username and password."
      );
    }
  }
);

export const register = createAsyncThunk(
  "users/register",
  async (registrationDetails: UserRegistration, { rejectWithValue }) => {
    try {
      const response = await userRepository.signup(registrationDetails);
      return response;
    } catch (err) {
      return rejectWithValue("Registration failed. Please try again later.");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout() {
      localStorage.removeItem("userToken")
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthToken>) => {
        state.status = "succeeded";
        // Destructure the payload to get the token and user details
        console.log(action.payload);
        
        const { token, email, userId, username } = action.payload;
        state.token = token;
        // Set the user details in state.user
        state.user = {
          _id: userId,
          email: email,
          username: username,
          // Add any other user details you receive and want to store
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        // Optionally, set the token if included in the response
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
