import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slices/usersSlice.js";
import tasksReducer from "./Slices/tasksSlice.js";

export const store = configureStore({
	reducer: {
		user: usersReducer,
		tasks: tasksReducer,
	},
	devTools: import.meta.env.VITE_MODE !== "production",
});