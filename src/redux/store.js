import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./Slices/tasksSlice.js";
import usersReducer from "./Slices/usersSlice.js";

export const store = configureStore({
	reducer: {
		user: usersReducer,
		tasks: tasksReducer,
	},
	devTools: import.meta.env.VITE_MODE !== "production",
});
