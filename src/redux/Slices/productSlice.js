import axios from "@api/axiosInstance.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	product: null,
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

// GET ALL PRODUCTS

export const getAllProducts = createAsyncThunk(
	"products/getAllProducts",
	async (page, { rejectedWithValue }) => {
		try {
			const response = await axios.get("/products", {
				params: page,
			});
			return response.data;
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al obtener productos",
			);
		}
	},
);

export const getProductById = createAsyncThunk(
	"products/getProductById",
	async (productId, { rejectedWithValue }) => {
		try {
			const response = await axios.get(`/products/detail/${productId}`);
			return response.data;
		} catch (error) {
			return rejectedWithValue(
				error.response?.data.message || "Error al obtener producto",
			);
		}
	},
);

// SEARCH PRODUCT BY QUERY

export const searchProducts = createAsyncThunk(
	"products/search",
	async (query, { rejectedWithValue }) => {
		try {
			const response = await axios.get("/products/search", {
				params: query,
			});
			return response.data;
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al buscar productos",
			);
		}
	},
);

// CREATE PRODUCT

export const createProduct = createAsyncThunk(
	"products/createProduct",
	async (productData, { rejectedWithValue }) => {
		try {
			const response = await axios.post("/products", productData);
			return response.data;
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al crear producto",
			);
		}
	},
);

// DELETE PRODUCT

export const deleteProduct = createAsyncThunk(
	"products/deleteProduct",
	async (productId, { rejectedWithValue }) => {
		try {
			const response = await axios.delete(`/products/${productId}`);
			return { productId, message: response.data.message };
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al eliminar producto",
			);
		}
	},
);

// UPDATE PRODUCT

export const updateProduct = createAsyncThunk(
	"products/updateProduct",
	async ({ productId, productData }, { rejectedWithValue }) => {
		try {
			const response = await axios.put(`/products/${productId}`, productData);
			return response.data;
		} catch (error) {
			return rejectedWithValue(
				error.response?.data?.message || "Error al actualizar producto",
			);
		}
	},
);

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// GET ALL PRODUCTS
			.addCase(getAllProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload.data;
				state.page = action.payload.page;
				state.totalPages = action.payload.totalPages;
				state.totalItems = action.payload.total;
				state.limit = action.payload.limit;
				state.hasNext = action.payload.hasNext;
				state.hasPrev = action.payload.hasPrev;
				state.message = null;
			})
			.addCase(getAllProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al obtener productos";
			})

			// GET PRODUCT BY ID
			.addCase(getProductById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getProductById.fulfilled, (state, action) => {
				state.loading = false;
				state.product = action.payload;
				state.message = null;
			})
			.addCase(getProductById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al obtener producto";
			})

			// SEARCH PRODUCTS
			.addCase(searchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(searchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload.data;
				state.page = action.payload.page;
				state.totalPages = action.payload.totalPages;
				state.totalItems = action.payload.total;
				state.limit = action.payload.limit;
				state.hasNext = action.payload.hasNext;
				state.hasPrev = action.payload.hasPrev;
				state.message = null;
			})
			.addCase(searchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al buscar productos";
			})

			// CREATE PRODUCT
			.addCase(createProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products.push(action.payload.product);
				state.message = action.payload.message;
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al crear producto";
			})

			// DELETE PRODUCT
			.addCase(deleteProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products = state.products.filter(
					(p) => p.id !== action.payload.productId,
				);
				state.message = action.payload.message;
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al eliminar producto";
			})

			// UPDATE PRODUCT
			.addCase(updateProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.loading = false;
				const updatedProduct = action.payload.product;
				state.products = state.products.map((p) =>
					p.id === updatedProduct.id ? updatedProduct : p,
				);
				state.message = action.payload.message;
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error al actualizar producto";
			});
	},
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;
