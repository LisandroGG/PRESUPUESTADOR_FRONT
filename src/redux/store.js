import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slices/usersSlice.js";
import clientsReducer from "./Slices/clientSlice.js";

export const store = configureStore({
	reducer: {
		user: usersReducer,
		clients: clientsReducer
	},
	devTools: import.meta.env.VITE_MODE !== "production",
});
