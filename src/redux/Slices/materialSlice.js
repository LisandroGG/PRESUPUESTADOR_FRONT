import axios from "@api/axiosInstance.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	materials: [],
	loading: false,
	error: null,
	message: null,
	page: 1,
	totalPages: 1,
	totalItems: 0,
	limit: 9,
	hasNext: false,
	hasPrev: false,
};

// GET ALL MATERIALS

export const getAllMaterials = createAsyncThunk(
	"materials/getAllMaterials",
	async (page, { rejectWithValue }) => {
		try {
			const response = await axios.get("/materials", {
				params: page,
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al obtener materiales",
			);
		}
	},
);

// GET ALL MATERIALS FOR SELECT

export const getAllMaterialsForSelect = createAsyncThunk(
	"materials/getAllMaterialsForSelect",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get("/materials/select");
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al obtener materiales",
			);
		}
	},
);

// SEARCH MATERIAL BY QUERY

export const searchMaterials = createAsyncThunk(
	"materials/search",
	async (query, { rejectWithValue }) => {
		try {
			const response = await axios.get("/materials/search", {
				params: query,
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al buscar materiales",
			);
		}
	},
);

// CREATE MATERIAL

export const createMaterial = createAsyncThunk(
	"materials/createMaterial",
	async (materialData, { rejectWithValue }) => {
		try {
			const response = await axios.post("/materials", materialData);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al crear material",
			);
		}
	},
);

// DELETE MATERIAL

export const deleteMaterial = createAsyncThunk(
	"materials/deleteMaterial",
	async (materialId, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`/materials/${materialId}`);
			return { materialId, message: response.data.message };
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Error al eliminar material",
			);
		}
	},
);

// UPDATE MATERIAL

export const updateMaterial = createAsyncThunk(
	"materials/updateMaterial",
	async ({ materialId, materialData }, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`/materials/${materialId}`,
				materialData,
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(
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
				state.materials = action.payload.data;
				state.page = action.payload.page;
				state.totalPages = action.payload.totalPages;
				state.totalItems = action.payload.total;
				state.limit = action.payload.limit;
				state.hasNext = action.payload.hasNext;
				state.hasPrev = action.payload.hasPrev;
				state.message = null;
			})
			.addCase(getAllMaterials.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al obtener materiales";
			})

			// GET ALL MATERIALS FOR SELECT
			.addCase(getAllMaterialsForSelect.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllMaterialsForSelect.fulfilled, (state, action) => {
				state.loading = false;
				state.materials = action.payload;
				state.message = null;
			})
			.addCase(getAllMaterialsForSelect.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload || "Error al obtener materiales para selección";
			})

			// SEARCH MATERIALS BY QUERY
			.addCase(searchMaterials.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(searchMaterials.fulfilled, (state, action) => {
				state.loading = false;
				state.materials = action.payload.data;
				state.page = action.payload.page;
				state.totalPages = action.payload.totalPages;
				state.totalItems = action.payload.total;
				state.limit = action.payload.limit;
				state.hasNext = action.payload.hasNext;
				state.hasPrev = action.payload.hasPrev;
				state.message = null;
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
