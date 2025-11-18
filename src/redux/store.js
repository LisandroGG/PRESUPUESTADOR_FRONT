import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slices/usersSlice.js";

export const store = configureStore({
	reducer: {
		user: usersReducer,
	},
	devTools: import.meta.env.VITE_MODE !== "production",
});
