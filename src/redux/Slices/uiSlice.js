import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: { homeLoading: false },
	reducers: {
		setHomeLoading: (state, action) => {
			state.homeLoading = action.payload;
		},
	},
});

export const { setHomeLoading } = uiSlice.actions;
export default uiSlice.reducer;
