import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import axiosInstance1 from "../../Helper/axiosInstace1";

const initialState = {
    loading: false,
    error: null,
    operators: [],
    packageCategory:[],
    packageInclude:[],
    packageData:[],
    packageTag:[],
    queryData:[]
};


export const changeStatus = createAsyncThunk('/admin/status', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.post('/admin/status', data);
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

export const addPackage = createAsyncThunk('/add/package', async (formData, { rejectWithValue }) => {
    try {
        console.log("form data is",formData);
        
        const res = await axiosInstance1.post('/package', formData);
        console.log(res)
        
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        console.log(e);
        
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

export const updatePackage = createAsyncThunk('/update/package', async ({formData,id}, { rejectWithValue }) => {
    try {
        console.log("form data is",formData);
        
        const res = await axiosInstance1.put(`/package/${id}`, formData);
        console.log(res)
        
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        console.log(e);
        
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

export const getPackage = createAsyncThunk('/get/package', async (_, { rejectWithValue }) => {
    try {
        
        const res = await axiosInstance1.get('/package');
       
        
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});


export const deletePackage = createAsyncThunk('/delete/package', async (id, { rejectWithValue }) => {
    try {
        
        const res = await axiosInstance1.delete(`/package/${id}`);
    
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});



export const getPackageCategory = createAsyncThunk(
    'package/getPackageCategory',
    async (_,{ rejectWithValue }) => {
        try {
            console.log("get package category");
            
                        
            const response = await axiosInstance1.get(`/package/category`);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addPackageCategory = createAsyncThunk(
    'package/addPackageCategory',
    async (data,{ rejectWithValue }) => {
        try {
            console.log("get package category");

            const formData=new FormData()

            formData.append("categoryName",data.categoryName)
            formData.append("categoryPhoto",data.categoryPhoto)
            
                        
            const response = await axiosInstance1.post(`/package/category`,formData);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const editPackageCategory = createAsyncThunk(
    'package/editPackageCategory',
    async (data,{ rejectWithValue }) => {
        try {
            console.log("get package category");

            const formData=new FormData()

            formData.append("categoryName",data.categoryName)
            formData.append("categoryPhoto",data.categoryPhoto)
            
                        
            const response = await axiosInstance1.put(`/package/category/${data.id}`,formData);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const deletePackageCategory = createAsyncThunk(
    'package/deletePackageCategory',
    async (categoryId,{ rejectWithValue }) => {
        try {
            console.log("get package category");
            
                        
            const response = await axiosInstance1.delete(`/package/category/${categoryId}`);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addPackageInclude = createAsyncThunk(
    'package/addPackageCategory',
    async (data,{ rejectWithValue }) => {
        try {
            
            const formData=new FormData()

            formData.append("includeName",data.includeName)
            formData.append("includePhoto",data.includePhoto)
            
                        
            const response = await axiosInstance1.post(`/package/include`,formData);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const editPackageInclude = createAsyncThunk(
    'package/addPackageCategory',
    async (data,{ rejectWithValue }) => {
        try {

            console.log("edit package include",data);

            const includeName=data.includeName

            const formData=new FormData()
            
            formData.append("includeName",data?.includeName)
            formData.append("includePhoto",data?.includePhoto)
            
                     
            const response = await axiosInstance1.put(`/package/include/${data.id}`,formData)
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);


export const deletePackageInclude = createAsyncThunk(
    'package/deletePackageInclude',
    async (includeId,{ rejectWithValue }) => {
        try {
  
            
                        
            const response = await axiosInstance1.delete(`/package/include/${includeId}`);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getPackageInclude = createAsyncThunk(
    'package/getPackageInclude',
    async (_,{ rejectWithValue }) => {
        try {
            console.log("get package category");
            
                        
            const response = await axiosInstance1.get(`/package/include`);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addOperator = createAsyncThunk('/admin/add', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.post('/admin/add', data);
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});


export const getOperators = createAsyncThunk('/admin/operators', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.get('/admin/operator');
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});




export const getPackageTag = createAsyncThunk(
    'package/getPackageTag',
    async (_,{ rejectWithValue }) => {
        try {
                 console.log("i am coming or not");
                  
            const response = await axiosInstance1.get(`/package/tag`);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to get Tag');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addPackageTag = createAsyncThunk(
    'package/addPackageTag',
    async (data,{ rejectWithValue }) => {
        try {
                     
           const response = await axiosInstance1.post(`/package/tag`,data);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add Tag');
            return rejectWithValue(error.response.data);
        }
    }
);

export const editPackageTag = createAsyncThunk(
    'package/editPackageTag',
    async (data,{ rejectWithValue }) => {
        try {             
            const response = await axiosInstance1.put(`/package/tag/${data.id}`,data);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to edit Tag');
            return rejectWithValue(error.response.data);
        }
    }
);

export const deletePackageTag = createAsyncThunk(
    'package/deletePackageTag',
    async (id,{ rejectWithValue }) => {
        try {
            console.log("get package category");
            
                        
            const response = await axiosInstance1.delete(`/package/tag/${id}`);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to Delete Tag');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getPackageQuery = createAsyncThunk(
    'package/getPackageQuery',
    async (_,{ rejectWithValue }) => {
        try {
            
                  
            const response = await axiosInstance1.get(`/query`);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to get Tag');
            return rejectWithValue(error.response.data);
        }
    }
);


export const addPackageStaus = createAsyncThunk(
    'package/changeStatus',
    async (id,{ rejectWithValue }) => {
        try {
           const response = await axiosInstance1.put(`/package/status/${id}`);
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add Tag');
            return rejectWithValue(error.response.data);
        }
    }
);





const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changeStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPackageCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPackageInclude.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPackage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPackageTag.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPackageQuery.pending, (state) => {
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
            .addCase(getPackageCategory.fulfilled, (state, action) => {
                console.log(action);
          
                state.packageCategory = action?.payload
                state.loading=false
                state.error=false
             })
             .addCase(getPackageInclude.fulfilled, (state, action) => {
                console.log(action);
          
                state.packageInclude = action?.payload
                state.loading=false
                state.error=false
             })
             .addCase(getPackage.fulfilled, (state, action) => {
                state.packageData = action?.payload?.data
                state.loading = false
                state.error = false
             })
            .addCase(getPackageTag.fulfilled, (state, action) => {
                console.log("tag is",action);
                
                state.packageTag = action?.payload
                state.loading = false
                state.error = false
             })
             .addCase(getPackageQuery.fulfilled, (state, action) => {
    
                
                state.queryData = action?.payload
                state.loading = false
                state.error = false
             })




            .addCase(changeStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to change status';
            })
            .addCase(getPackage.rejected, (state, action) => {
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
            .addCase(getPackageCategory.rejected, (state, action) => {
                state.error = action?.payload?.success
            })
            .addCase(getPackageTag.rejected, (state, action) => {
                state.error = action?.payload?.success
            })
            .addCase(getPackageInclude.rejected, (state, action) => {
                state.error = action?.payload?.success
            })
            .addCase(getPackageQuery.rejected, (state, action) => {
                state.error = action?.payload?.success
            });

    }
});

export default packageSlice.reducer;
