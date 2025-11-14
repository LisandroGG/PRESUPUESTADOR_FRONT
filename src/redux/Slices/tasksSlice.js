import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "@api/axiosInstance.js";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

//GET TASKS

export const getTasks = createAsyncThunk(
    "tasks/getTasks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/tasks");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al obtener las tareas"
            );
        }
    },
);

//CREATE TASK

export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (taskData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/tasks", taskData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al crear la tarea"
            );
        }
    },
);

//EDIT TASK

export const editTask = createAsyncThunk(
    "tasks/editTask",
    async ({ id, taskData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/tasks/${id}`, taskData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al editar la tarea"
            );
        }
    },
);

//DELETE TASK

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/tasks/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al eliminar la tarea"
            );
        }
    },
);

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET TASKS
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // CREATE TASK
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // EDIT TASK
            .addCase(editTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editTask.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(editTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // DELETE TASK
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default tasksSlice.reducer;