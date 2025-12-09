import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./Slices/clientSlice.js";
import materialsReducer from "./Slices/materialSlice.js";
import productsSlice from "./Slices/productSlice.js";
import usersReducer from "./Slices/usersSlice.js";
import paymentsReducer from "./Slices/paymentSlice.js";

export const store = configureStore({
	reducer: {
		user: usersReducer,
		clients: clientsReducer,
		materials: materialsReducer,
		products: productsSlice,
		payments: paymentsReducer,
	},
	devTools: import.meta.env.VITE_MODE !== "production",
});
