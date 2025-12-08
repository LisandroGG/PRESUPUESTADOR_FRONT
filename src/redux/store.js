import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./Slices/clientSlice.js";
import materialsReducer from "./Slices/materialSlice.js";
import usersReducer from "./Slices/usersSlice.js";

export const store = configureStore({
	reducer: {
		user: usersReducer,
		clients: clientsReducer,
		materials: materialsReducer,
	},
	devTools: import.meta.env.VITE_MODE !== "production",
});
