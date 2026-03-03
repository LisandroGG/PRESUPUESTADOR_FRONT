import axios from "@api/axiosInstance.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	stats: {
		totalClients: 0,
		totalProducts: 0,
		pendingBudgets: 0,
		approvedBudgets: 0,
	},
	loading: false,
	error: null,
};

export const getDashboardStats = createAsyncThunk(
	"stats/getDashboardStats",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get("/stats");
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al obtener estadisticas",
			);
		}
	},
);

export const statsSlice = createSlice({
	name: "stats",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDashboardStats.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getDashboardStats.fulfilled, (state, action) => {
				state.loading = false;
				state.stats = action.payload;
				state.error = null;
			})
			.addCase(getDashboardStats.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al obtener estadisticas";
			});
	},
});

export const { clearError } = statsSlice.actions;
export default statsSlice.reducer;
