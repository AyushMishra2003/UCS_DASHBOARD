import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from '../../Helper/axiosInstance';
import { toast } from "sonner";
import axiosInstance1 from "../../Helper/axiosInstace1";

const initialState = {
    loading: false,
    error: null,
    operators: [],
    role:[]
};

// Async thunk for changing status

// export const addOperator = createAsyncThunk(
//     'operator/addOperator',
//     async (operatorData, { rejectWithValue }) => {
//         try {
//             const response = await axios.post('/api/operators', operatorData);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );



export const changeStatus = createAsyncThunk('/operator/status', async (id, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.get(`operator/status/${id}`);
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});


export const addOperator = createAsyncThunk('/operator/add', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.post('/operator', data);
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

export const editOperator = createAsyncThunk('/operator/edit', async ({data,id}, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.put(`/operator/${id}`, data);
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

// Async thunk for getting all operators
export const getOperators = createAsyncThunk('/admin/operators', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.get('/operator');
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

export const deleteOperators = createAsyncThunk('/operator/delete', async (id, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.delete(`/operator/${id}`);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});


export const getOperatorRole = createAsyncThunk('/operator/role/get', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.get('/role');
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

export const addOperatorRole = createAsyncThunk('/operator/role/add', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.post('/role',data);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

export const  editOperatorRole = createAsyncThunk('/operator/role/edit', async ({data,editRoleId}, { rejectWithValue }) => {
    try {
       
        const res = await axiosInstance1.put(`/role/${editRoleId}`,data);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

export const  deleteOperatorRole = createAsyncThunk('/operator/role/delete', async (id, { rejectWithValue }) => {
    try {
       
        const res = await axiosInstance1.delete(`/role/${id}`);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});




const operatorSlice = createSlice({
    name: "operator",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changeStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeStatus.fulfilled, (state, action) => {
                state.loading = false;
                // Find the operator in the list and update their status
                const operatorIndex = state.operators.findIndex(operator => operator.email === action.meta.arg.email);
                if (operatorIndex !== -1) {
                    state.operators[operatorIndex].status = action.meta.arg.status;
                }
            })
            .addCase(changeStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to change status';
            })
            .addCase(getOperators.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOperators.fulfilled, (state, action) => {
                state.loading = false;
                state.operators = action?.payload?.data; // Populate the operators array with fetched data
            })
            .addCase(getOperators.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch operators';
            })

            .addCase(getOperatorRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getOperatorRole.fulfilled, (state, action) => {
                state.loading = false;
                state.role = action?.payload?.data; // Populate the operators array with fetched data
            })

            .addCase(getOperatorRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch operator Role';
            })


    }
});

export default operatorSlice.reducer;
