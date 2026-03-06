import { configureStore } from "@reduxjs/toolkit";
import budgetsReducer from "./Slices/budgetSlice.js";
import clientsReducer from "./Slices/clientSlice.js";
import materialsReducer from "./Slices/materialSlice.js";
import paymentsReducer from "./Slices/paymentSlice.js";
import productsSlice from "./Slices/productSlice.js";
import statsSlice from "./Slices/statsSlice.js";
import uiSlice from "./Slices/uiSlice.js";

export const store = configureStore({
	reducer: {
		clients: clientsReducer,
		materials: materialsReducer,
		products: productsSlice,
		payments: paymentsReducer,
		budgets: budgetsReducer,
		stats: statsSlice,
		ui: uiSlice,
	},
	devTools: import.meta.env.VITE_MODE !== "production",
});
