import axios from "@api/axiosInstance.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	loading: false,
	error: null,
	isAuthenticated: false,
	message: null,
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
				error.response?.data?.message || "Error al iniciar sesión",
			);
		}
	},
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
				error.response?.data?.message || "Error al cerrar sesión",
			);
		}
	},
);

// REFRESH TOKEN

export const refreshToken = createAsyncThunk(
	"user/refreshToken",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.post("/users/refresh-token");
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al refrescar el token",
			);
		}
	},
);

export const getSession = createAsyncThunk(
	"user/getSession",
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const { data } = await axios.get("/users/get-session");
			return data.user;
		} catch (error) {
			if (error.response?.status === 401) {
				const refreshResult = await dispatch(refreshToken());

				if (refreshResult.meta.requestStatus === "rejected") {
					return rejectWithValue("No se pudo refrescar el token");
				}

				try {
					const { data: userData } = await axios.get("/users/get-session");
					return userData.user;
				} catch {
					return rejectWithValue("Error después del token refrescado");
				}
			}

			return rejectWithValue("Error obteniendo sesión");
		}
	},
);

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
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
				state.message = action.payload.message;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				state.isAuthenticated = false;
				state.error = action.payload || "Error al iniciar sesión";
			})

			// REFRESH TOKEN
			.addCase(refreshToken.pending, (state) => {
				state.loading = true;
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.isAuthenticated = true;
				state.error = null;
			})
			.addCase(refreshToken.rejected, (state) => {
				state.loading = false;
				state.isAuthenticated = false;
			})

			// GET SESSION
			.addCase(getSession.pending, (state) => {
				state.loading = true;
			})
			.addCase(getSession.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.isAuthenticated = true;
				state.error = null;
			})
			.addCase(getSession.rejected, (state) => {
				state.loading = false;
				state.user = null;
				state.isAuthenticated = false;
			})

			// LOGOUT
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
				state.isAuthenticated = false;
				state.error = null;
			})
			.addCase(logoutUser.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer;
