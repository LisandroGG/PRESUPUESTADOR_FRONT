import axios from "@api/axiosInstance.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	payments: [],
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
				state.page = action.payload.page;
				state.totalPages = action.payload.totalPages;
				state.totalItems = action.payload.total;
				state.limit = action.payload.limit;
				state.hasNext = action.payload.hasNext;
				state.hasPrev = action.payload.hasPrev;
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
			});
	},
});

export const { clearError } = paymentsSlice.actions;
export default paymentsSlice.reducer;
