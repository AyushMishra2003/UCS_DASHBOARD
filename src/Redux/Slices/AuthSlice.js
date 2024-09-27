import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "sonner"
import axiosInstance from '../../Helper/axiosInstance'

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') !== "undefined" ? JSON.parse(localStorage.getItem('data')) : {},
    globalSettingsData: localStorage.getItem('globalSettingsData') !== "undefined" ? JSON.parse(localStorage.getItem('globalSettingsData')) : {},
    aboutSettingsData: localStorage.getItem('aboutSettingsData') !== "undefined" ? JSON.parse(localStorage.getItem('aboutSettingsData')) : {},
    contactSettingsData: localStorage.getItem('contactSettingsData') !== "undefined" ? JSON.parse(localStorage.getItem('contactSettingsData')) : {},
    testimonialData: localStorage.getItem('testimonialData') !== "undefined" ? JSON.parse(localStorage.getItem('testimonialData')) : {},

}


export const createAccount = createAsyncThunk('/admin/register', async (data) => {
    try {
        let res = axiosInstance.post('/register', data)

        toast.promise(res, {
            loading: 'Creating Account',
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to create an account"
        })

        res = await res
        return res.data

    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const loginAccount = createAsyncThunk('/admin/login', async (data) => {
    try {
        let res = axiosInstance.post('login', data)
        toast.promise(res, {
            loading: 'Wait! Logging in',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to login"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }

})

export const logout = createAsyncThunk('/admin/logout', async () => {
    try {
        let res = axiosInstance.get('logout')
        toast.promise(res, {
            loading: 'Wait! Logging out',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to logout"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }

})

export const userProfile = createAsyncThunk('/admin/details', async () => {
    try {
        const res = axiosInstance.get("me")
        return (await res).data
    } catch (e) {
        toast.error(e?.message)
    }
})

export const editProfile = createAsyncThunk('admin/update-profile', async (data) => {
    try {
        let res = axiosInstance.put(`update-profile/${data[0]}`, data[1])
        toast.promise(res, {
            loading: "Updating Profile!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to update!"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const changePassword = createAsyncThunk('admin/update-password', async (data) => {
    try {
        let res = axiosInstance.post(`change-password`, data)

        res = await res;
        toast.success(res?.data.message)

        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const forgotPassword = createAsyncThunk('admin/forgot-password', async (data) => {
    try {
        let res = axiosInstance.post(`forgot-password`, data)
        toast.promise(res, {
            loading: "Sending password reset link to registered mail!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to send reset link"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const resetPasswords = createAsyncThunk('admin/reset-password', async (data) => {
    try {
        let res = axiosInstance.post(`reset-password/${data[0]}`, data[1])
        toast.promise(res, {
            loading: "Reseting Password!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to reset password"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getGlobalSettingsData = createAsyncThunk('admin/global-settings', async () => {
    try {
        let res = axiosInstance.get(`/global-settings`)
        toast.promise(res, {
            // pending: "Getting data!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to reset password"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const createGlobalSettingsData = createAsyncThunk('create/global-settings', async (data) => {
    try {
        let res = axiosInstance.post(`/global-settings`, data)
        toast.promise(res, {
            // pending: "Updating!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to update"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getAboutSettingsData = createAsyncThunk('admin/about-settings', async () => {
    try {
        let res = axiosInstance.get(`/about`)
        toast.promise(res, {
            // pending: "Getting data!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to reset password"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const createAboutSettingsData = createAsyncThunk('create/about-settings', async (data) => {
    try {
        let res = axiosInstance.post(`/about`, data)
        toast.promise(res, {
            // pending: "Updating!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to update"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getContactSettingsData = createAsyncThunk('admin/contact-settings', async () => {
    try {
        let res = axiosInstance.get(`/contact`)
        toast.promise(res, {
            // pending: "Getting data!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to submit!"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const createContactSettingsData = createAsyncThunk('create/contact-settings', async (data) => {
    try {
        let res = axiosInstance.post(`/contact`, data)
        toast.promise(res, {
            // pending: "Updating!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to update!"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getTestimonialData = createAsyncThunk('admin/testimonial-settings', async () => {
    try {
        let res = axiosInstance.get(`/testimonial`)
        toast.promise(res, {
            // pending: "Getting data!",
            success: (data) => {
                return data?.data.message
            },
            // error: "Failed to s!"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const createTestimonial = createAsyncThunk('create/testimonial-settings', async (data) => {
    try {
        let res = axiosInstance.post(`/testimonial`, data)
        toast.promise(res, {
            // pending: "Updating!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to add!"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const deleteTestimonialData = createAsyncThunk('delete/testimonial-settings', async (id) => {
    try {
        console.log(id)
        let res = axiosInstance.delete(`/testimonial/${id}`)
        toast.promise(res, {
            // pending: "Getting data!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to remove!"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccount.fulfilled, (state, action) => {
            localStorage.setItem('data', JSON.stringify(action?.payload?.admin))
            localStorage.setItem('role', action?.payload?.admin?.role)
            state.data = action?.payload?.admin
            state.role = action?.payload?.admin?.role
        })
            .addCase(loginAccount.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action?.payload?.admin))
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('role', action?.payload?.admin?.role)
                state.role = action?.payload?.admin?.role
                state.data = action?.payload?.admin
                state.isLoggedIn = true
            }).addCase(logout.fulfilled, (state) => {
                localStorage.clear()
                state.data = {}
                state.isLoggedIn = false
                state.role = ""

            }).addCase(userProfile.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action?.payload?.admin))
                localStorage.setItem('role', action?.payload?.admin?.role)
                state.role = action?.payload?.admin?.role
                state.data = action?.payload?.admin
            }).addCase(getGlobalSettingsData.fulfilled, (state, action) => {
                localStorage.setItem('globalSettingsData', JSON.stringify(action?.payload?.globalSettingsData))
                state.globalSettingsData = action?.payload?.globalSettingsData
            }).addCase(getAboutSettingsData.fulfilled, (state, action) => {
                localStorage.setItem('aboutSettingsData', JSON.stringify(action?.payload?.aboutData))
                state.aboutSettingsData = action?.payload?.aboutData
            }).addCase(getContactSettingsData.fulfilled, (state, action) => {
                localStorage.setItem('contactSettingsData', JSON.stringify(action?.payload?.contactDetails))
                state.contactSettingsData = action?.payload?.contactDetails
            }).addCase(getTestimonialData.fulfilled, (state, action) => {
                localStorage.setItem('testimonialData', JSON.stringify(action?.payload?.testimonialData))
                state.testimonialData = action?.payload?.testimonialData
            })
    }
})


export default authSlice.reducer