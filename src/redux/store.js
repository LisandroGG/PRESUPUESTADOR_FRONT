import { configureStore } from "@reduxjs/toolkit";
import budgetsReducer from "./Slices/budgetSlice.js";
import clientsReducer from "./Slices/clientSlice.js";
import materialsReducer from "./Slices/materialSlice.js";
import paymentsReducer from "./Slices/paymentSlice.js";
import productsSlice from "./Slices/productSlice.js";
import statsSlice from "./Slices/statsSlice.js";
import usersReducer from "./Slices/usersSlice.js";

export const store = configureStore({
	reducer: {
		user: usersReducer,
		clients: clientsReducer,
		materials: materialsReducer,
		products: productsSlice,
		payments: paymentsReducer,
		budgets: budgetsReducer,
		stats: statsSlice,
	},
	devTools: import.meta.env.VITE_MODE !== "production",
});
