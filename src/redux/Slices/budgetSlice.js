import axios from "@api/axiosInstance.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	budgets: [],
	budget: null,
	loading: false,
	error: null,
	message: null,
	page: 1,
	totalPages: 1,
	totalItems: 0,
	limit: 9,
	hasNext: false,
	hasPrev: false,
};

// GET ALL BUDGETS

export const getAllBudgets = createAsyncThunk(
	"budgets/getAllBudgets",
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get("/budgets", {
				params,
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al obtener presupuestos",
			);
		}
	},
);

// GET BUDGET BY ID

export const getBudgetById = createAsyncThunk(
	"budgets/getBudgetById",
	async (budgetId, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/budgets/detail/${budgetId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al obtener el presupuesto",
			);
		}
	},
);

// CREATE BUDGET

export const createBudget = createAsyncThunk(
	"budgets/createBudget",
	async (budgetData, { rejectWithValue }) => {
		try {
			const response = await axios.post("/budgets", budgetData);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al crear el presupuesto",
			);
		}
	},
);

// DELETE BUDGET

export const deleteBudget = createAsyncThunk(
	"budget/deleteBudget",
	async (budgetId, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`/budgets/${budgetId}`);
			return { budgetId, message: response.data.message };
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al eliminar presupuesto",
			);
		}
	},
);

export const updateBudget = createAsyncThunk(
	"budgets/updateBudget",
	async ({ budgetId, budgetData }, { rejectWithValue }) => {
		try {
			const response = await axios.put(`/budgets/${budgetId}`, budgetData);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al actualizar presuspuesto",
			);
		}
	},
);

// UPDATE BUDGET STATUS

export const updateBudgetStatus = createAsyncThunk(
	"budgets/updateBudgetStatus",
	async ({ budgetId, status }, { rejectWithValue }) => {
		try {
			const response = await axios.put(`/budgets/status/${budgetId}`, {
				status,
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message ||
					"Error al actualizar el estado del presupuesto",
			);
		}
	},
);

export const budgetsSlice = createSlice({
	name: "budgets",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// GET ALL BUDGETS
			.addCase(getAllBudgets.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllBudgets.fulfilled, (state, action) => {
				state.loading = false;
				state.budgets = action.payload.data;
				state.page = action.payload.page;
				state.totalPages = action.payload.totalPages;
				state.totalItems = action.payload.total;
				state.limit = action.payload.limit;
				state.hasNext = action.payload.hasNext;
				state.hasPrev = action.payload.hasPrev;
				state.message = null;
			})
			.addCase(getAllBudgets.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al obtener presupuestos";
			})

			// GET BUDGET BY ID
			.addCase(getBudgetById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getBudgetById.fulfilled, (state, action) => {
				state.loading = false;
				state.budget = action.payload;
				state.message = null;
			})
			.addCase(getBudgetById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al obtener presupuesto";
			})

			// CREATE BUDGET
			.addCase(createBudget.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createBudget.fulfilled, (state, action) => {
				state.loading = false;
				state.budgets.push(action.payload.budget);
				state.message = action.payload.message;
			})
			.addCase(createBudget.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al crear presupuesto";
			})

			// DELETE BUDGET
			.addCase(deleteBudget.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteBudget.fulfilled, (state, action) => {
				state.loading = false;
				state.budgets = state.budgets.filter(
					(b) => b.id !== action.payload.budgetId,
				);
				state.message = action.payload.message;
			})
			.addCase(deleteBudget.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al eliminar presupuesto";
			})

			// UPDATE BUDGET
			.addCase(updateBudget.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateBudget.fulfilled, (state, action) => {
				state.loading = false;
				const updatedBudget = action.payload.budget;
				state.budgets = state.budgets.map((b) =>
					b.id === updatedBudget.id ? updatedBudget : b,
				);
				state.message = action.payload.message;
			})
			.addCase(updateBudget.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al actualizar presupuesto";
			})
			// UPDATE BUDGET STATUS
			.addCase(updateBudgetStatus.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateBudgetStatus.fulfilled, (state, action) => {
				state.loading = false;
				const { budgetId, status } = action.meta.arg;
				state.budgets = state.budgets.map((b) =>
					b.id === budgetId ? { ...b, status } : b,
				);
				if (state.budget && state.budget.id === budgetId) {
					state.budget.status = status;
				}
				state.message = action.payload.message;
			})
			.addCase(updateBudgetStatus.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload || "Error al actualizar el estado del presupuesto";
			});
	},
});

export const { clearError } = budgetsSlice.actions;
export default budgetsSlice.reducer;
