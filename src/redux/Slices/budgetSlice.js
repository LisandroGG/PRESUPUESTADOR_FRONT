import axios from "@api/axiosInstance.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	budgets: [],
	budget: null,
	loading: false,
	error: null,
	message: null,
};

// GET ALL BUDGETS

export const getAllBudgets = createAsyncThunk(
	"budgets/getAllBudgets",
	async (_, { rejectedWithValue }) => {
		try {
			const response = await axios.get("/budgets");
			return response.data;
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al obtener presupuestos",
			);
		}
	},
);

// GET ALL BUDGETS FROM A CLIENT

export const getAllBudgetsFromClient = createAsyncThunk(
	"budgets/getAllBudgetsFromCient",
	async (cliendId, { rejectedWithValue }) => {
		try {
			const response = await axios.get(`/budgets/client/${cliendId}`);
			return response.data;
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message ||
					"Error al obtener presupuestos del cliente",
			);
		}
	},
);

// GET BUDGET BY ID

export const getBudgetById = createAsyncThunk(
	"budgets/getBudgetById",
	async (budgetId, { rejectedWithValue }) => {
		try {
			const response = await axios.get(`/budgets/detail/${budgetId}`);
			return response.data;
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al obtener el presupuesto",
			);
		}
	},
);

// CREATE BUDGET

export const createBudget = createAsyncThunk(
	"budgets/createBudget",
	async (budgetData, { rejectedWithValue }) => {
		try {
			const response = await axios.post("/budgets", budgetData);
			return response.data;
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al crear el presupuesto",
			);
		}
	},
);

// DELETE BUDGET

export const deleteBudget = createAsyncThunk(
	"budget/deleteBudget",
	async (budgetId, { rejectedWithValue }) => {
		try {
			const response = await axios.delete(`/budgets/${budgetId}`);
			return { budgetId, message: response.data.message };
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al eliminar presupuesto",
			);
		}
	},
);

// UPDATE BUDGET STATUS

export const updateBudgetStatus = createAsyncThunk(
	"budgets/updateBudgetStatus",
	async ({ budgetId, status }, { rejectedWithValue }) => {
		try {
			const response = await axios.put(`/budgets/status/${budgetId}`, {
				status,
			});
			return response.data;
		} catch (error) {
			return rejectedWithValue(
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
				state.budgets = action.payload;
				state.message = null;
			})
			.addCase(getAllBudgets.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al obtener presupuestos";
			})

			// GET ALL BUDGETS FROM A CLIENT
			.addCase(getAllBudgetsFromClient.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllBudgetsFromClient.fulfilled, (state, action) => {
				state.loading = false;
				state.budgets = action.payload;
				state.message = null;
			})
			.addCase(getAllBudgetsFromClient.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload || "Error al obtener presupuestos del cliente";
			})

			// GET BUDGET BY ID
			.addCase(getBudgetById, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getBudgetById, (state, action) => {
				state.loading = false;
				state.budget = action.payload;
				state.message = null;
			})
			.addCase(getBudgetById, (state, action) => {
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
