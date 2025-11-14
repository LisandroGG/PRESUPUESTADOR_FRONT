import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "@api/axiosInstance.js";

const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

// LOGIN

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async ({ user, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post("/users/login", { user, password });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al iniciar sesión"
            );
        }
    }
);

// LOGOUT

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post("/users/logout");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al cerrar sesión"
            );
        }
    }
);

// REFRESH TOKEN

export const refreshToken = createAsyncThunk(
    "user/refreshToken",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/users/refresh-token");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al refrescar el token"
            );
        }
    }
);

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // LOGOUT
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // REFRESH TOKEN
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
    }
});

export default usersSlice.reducer;
