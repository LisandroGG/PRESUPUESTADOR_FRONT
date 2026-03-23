import axios from "@api/axiosInstance.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	payments: [],
	checks: [],
	loading: false,
	updateLoading: false,
	error: null,
	message: null,
	page: 1,
	totalPages: 1,
	totalItems: 0,
	limit: 9,
	hasNext: false,
	hasPrev: false,
};

// GET ALL PAYMENTS FROM BUDGET

export const getAllPaymentsFromBudget = createAsyncThunk(
	"payments/getAllPayments",
	async (budgetId, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/payments/${budgetId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al obtener pagos",
			);
		}
	},
);

// CREATE PAYMENT

export const createPayment = createAsyncThunk(
	"payments/createPayment",
	async (paymentData, { rejectWithValue }) => {
		try {
			const response = await axios.post("/payments", paymentData);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al crear pago",
			);
		}
	},
);

// DELETE PAYMENT

export const deletePayment = createAsyncThunk(
	"payments/deletePayment",
	async (paymentId, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`/payments/${paymentId}`);
			return { paymentId, message: response.data.message };
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al eliminar pago",
			);
		}
	},
);

// GET ALL CHECKS

export const getAllChecks = createAsyncThunk(
	"payments/getAllChecks",
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get("/payments", {
				params,
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al obtener cheques",
			);
		}
	},
);

// UPDATE CHECK DETAIL

export const updateCheckDetail = createAsyncThunk(
	"payments/updateCheckDetail",
	async ({ paymentId, checkData }, { rejectWithValue }) => {
		try {
			const response = await axios.put(`/payments/${paymentId}`, checkData);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data.message || "Error al actualizar cheque",
			);
		}
	},
);

export const paymentsSlice = createSlice({
	name: "payments",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// GET ALL PAYMENTS FROM BUDGET
			.addCase(getAllPaymentsFromBudget.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllPaymentsFromBudget.fulfilled, (state, action) => {
				state.loading = false;
				state.payments = action.payload.data;
				state.message = null;
			})
			.addCase(getAllPaymentsFromBudget.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al obtener pagos";
			})

			// CREATE PAYMENT
			.addCase(createPayment.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createPayment.fulfilled, (state, action) => {
				state.loading = false;
				state.payments.push(action.payload.payment);
				state.message = action.payload.message;
			})
			.addCase(createPayment.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al crear pago";
			})

			// DELETE PAYMENT
			.addCase(deletePayment.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deletePayment.fulfilled, (state, action) => {
				state.loading = false;
				state.payments = state.payments.filter(
					(p) => p.id !== action.payload.paymentId,
				);
				state.message = action.payload.message;
			})
			.addCase(deletePayment.rejected, (state, action) => {
				state.loading = false;
				state.message = action.payload || "Error al eliminar pago";
			})

			// GET ALL CHECKS
			.addCase(getAllChecks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllChecks.fulfilled, (state, action) => {
				state.loading = false;
				state.checks = action.payload.data;
				state.page = action.payload.page;
				state.totalPages = action.payload.totalPages;
				state.totalItems = action.payload.total;
				state.limit = action.payload.limit;
				state.hasNext = action.payload.hasNext;
				state.hasPrev = action.payload.hasPrev;
				state.message = null;
			})
			.addCase(getAllChecks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al obtener cheques";
			})

			// UPDATE CHECK DETAIL
			.addCase(updateCheckDetail.pending, (state) => {
				state.updateLoading = true;
				state.error = null;
			})
			.addCase(updateCheckDetail.fulfilled, (state, action) => {
				state.updateLoading = false;
				const updatedCheck = action.payload.payment;
				state.checks = state.checks.map((p) =>
					p.id === updatedCheck.id ? updatedCheck : p,
				);
				state.message = action.payload.message;
			})
			.addCase(updateCheckDetail.rejected, (state) => {
				state.updateLoading = false;
				state.error = action.payload || "Error al actualizar cheque";
			});
	},
});

export const { clearError } = paymentsSlice.actions;
export default paymentsSlice.reducer;
