import axios from "@api/axiosInstance.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	materials: [],
	loading: false,
	error: null,
	message: null,
};

// GET ALL MATERIALS

export const getAllMaterials = createAsyncThunk(
	"materials/getAllMaterials",
	async (_, { rejectedWithValue }) => {
		try {
			const response = await axios.get("/materials");
			return response.data;
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al obtener materiales",
			);
		}
	},
);

// SEARCH MATERIAL BY QUERY

export const searchMaterials = createAsyncThunk(
	"materials/search",
	async (query, { rejectedWithValue }) => {
		try {
			const response = await axios.get("/materials/search", {
				params: query,
			});
			return response.data;
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al buscar materiales",
			);
		}
	},
);

// CREATE MATERIAL

export const createMaterial = createAsyncThunk(
	"materials/createMaterial",
	async (materialData, { rejectedWithValue }) => {
		try {
			const response = await axios.post("/materials", materialData);
			return response.data;
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al crear material",
			);
		}
	},
);

// DELETE MATERIAL

export const deleteMaterial = createAsyncThunk(
	"materials/deleteMaterial",
	async (materialId, { rejectedWithValue }) => {
		try {
			const response = await axios.delete(`/materials/${materialId}`);
			return { materialId, message: response.data.message };
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al eliminar material",
			);
		}
	},
);

// UPDATE MATERIAL

export const updateMaterial = createAsyncThunk(
	"materials/updateMaterial",
	async ({ materialId, materialData }, { rejectedWithValue }) => {
		try {
			const response = await axios.put(
				`/materials/${materialId}`,
				materialData,
			);
			return response.data;
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al actualizar material",
			);
		}
	},
);

export const materialsSlice = createSlice({
	name: "materials",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// GET ALL MATERIALS
			.addCase(getAllMaterials.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllMaterials.fulfilled, (state, action) => {
				state.loading = false;
				state.materials = action.payload;
				state.message = null;
			})
			.addCase(getAllMaterials.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al obtener materiales";
			})

			// SEARCH MATERIALS BY QUERY
			.addCase(searchMaterials.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(searchMaterials.fulfilled, (state, action) => {
				state.loading = false;
				state.materials = action.payload.materials;
				state.message = action.payload.message;
			})
			.addCase(searchMaterials.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al buscar materiales";
			})

			// CREATE MATERIAL
			.addCase(createMaterial.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createMaterial.fulfilled, (state, action) => {
				state.loading = false;
				state.materials.push(action.payload.material);
				state.message = action.payload.message;
			})
			.addCase(createMaterial.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al crear material";
			})

			// DELETE MATERIAL
			.addCase(deleteMaterial.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteMaterial.fulfilled, (state, action) => {
				state.loading = false;
				state.materials = state.materials.filter(
					(m) => m.id !== action.payload.materialId,
				);
				state.message = action.payload.message;
			})
			.addCase(deleteMaterial.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al eliminar material";
			})

			// UPDATE MATERIAL
			.addCase(updateMaterial.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateMaterial.fulfilled, (state, action) => {
				state.loading = false;
				const updatedMaterial = action.payload.material;
				state.materials = state.materials.map((m) =>
					m.id === updatedMaterial.id ? updatedMaterial : m,
				);
				state.message = action.payload.message;
			})
			.addCase(updateMaterial.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al actualizar material";
			});
	},
});

export const { clearError } = materialsSlice.actions;
export default materialsSlice.reducer;
