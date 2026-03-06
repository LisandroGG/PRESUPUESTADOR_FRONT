import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: { homeLoading: true },
	reducers: {
		setHomeLoading: (state, action) => {
			state.homeLoading = action.payload;
		},
	},
});

export const { setHomeLoading } = uiSlice.actions;
export default uiSlice.reducer;
