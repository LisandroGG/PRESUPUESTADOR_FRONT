import axios from "@api/axiosInstance.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    clients: [],
    loading: false,
    error: null,
    message: null,
}

// GET ALL CLIENTS

export const getAllClients = createAsyncThunk(
    "clients/getAllClients",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/clients")
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al obtener clientes"
            )
        }
    }
)

// SEARCH CLIENT BY QUERY

export const searchClient = createAsyncThunk(
    "clients/search",
    async (query, { rejectWithValue }) => {
        try {
            const response = await axios.get("/clients/search", {
                params: query,
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al buscar clientes"
            )
        }
    }
)

// CREATE CLIENT

export const createClient = createAsyncThunk(
    "clients/createClient",
    async (clientData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/clients", clientData)
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al crear cliente"
            )
        }
    }
)

// DELETE CLIENT

export const deleteClient = createAsyncThunk(
    "clients/deleteClient",
    async (clientId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/clients/${clientId}`)
            return { clientId, message: response.data.message };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al eliminar cliente"
            )
        }
    } 
)

// UPDATE CLIENT

export const updateClient = createAsyncThunk(
    "clients/updateClient",
    async ({ clientId, clientData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/clients/${clientId}`, clientData)
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al actualizar cliente"
            )
        }
    }
)

export const clientsSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // GET ALL CLIENTS
            .addCase(getAllClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload;
                state.message = null;
            })
            .addCase(getAllClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al obtener clientes";
            })

            // SEARCH CLIENT BY QUERY
            .addCase(searchClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchClient.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload.clients;
                state.message = action.payload.message;
            })
            .addCase(searchClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al buscar clientes";
            })
            
            // CREATE CLIENT
            .addCase(createClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createClient.fulfilled, (state, action) => {
                state.loading = false;
                state.clients.push(action.payload.client)
                state.message = action.payload.message;
            })
            .addCase(createClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al crear cliente"
            })

            // DELETE CLIENT
            .addCase(deleteClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = state.clients.filter (
                    c => c.id !== action.payload.clientId
                )
                state.message = action.payload.message;
            })
            .addCase(deleteClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al eliminar cliente"
            })

            // UPDATE CLIENT
            .addCase(updateClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                state.loading = false;
                const updatedClient = action.payload.client;
                state.clients = state.clients.map((c) => 
                    c.id === updatedClient.id ? updatedClient : c 
                );
                state.message = action.payload.message;
            })
            .addCase(updateClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al actualizar cliente"
            })

    }
})

export const { clearError } = clientsSlice.actions;
export default clientsSlice.reducer;