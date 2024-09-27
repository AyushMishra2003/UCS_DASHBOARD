import React, { useState } from 'react'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { loginAccount } from '../../Redux/Slices/LoginSlice'

const Login = () => {
    const [eye, setEye] = useState(true)
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const [loaderActive, setLoaderActive] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.auth)

    const handleEyeClick = () => {
        setEye(!eye)
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const handleFormInput = async (e) => {
        e.preventDefault()

        const { email, password } = loginData

        if (!email || !password) {
            setLoaderActive(false)
            return toast.error('All fields are required')
        }

        setLoaderActive(true)

        const response = await dispatch(loginAccount(loginData))

        if (response?.payload?.success) {
            toast.success('Login successful')
            navigate('/')
        } else {
            toast.error(error || 'Login failed')
            setLoaderActive(false)
        }
    }

    const mainDiv = 'flex flex-col gap-[0.1px]'
    const labelStyle = "text-[0.83rem] tracking-wide text-[#CFCCE4] font-[400] ml-[0.5px]"
    const inputStyle = 'border border-[#685ED4] min-w-[18rem] max-w-[20.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white'

    return (
        <div className='min-h-[90vh] min-w-full flex items-start justify-center bg-[#f8f6fc]'>
            <div className='shadow-[0px_0px_20px_#3D4056] flex items-center justify-center gap-4 mt-12 bg-[#2F3349] text-white  rounded-lg w-fit'>
                <form noValidate onSubmit={handleFormInput} className='flex flex-col items-start justify-center gap-2 p-4 py-8'>
                    <div className='w-full mt-3 mb-10 text-center '>
                        <h1 className=' text-[1.5rem] font-semibold'>Hello Admin👋</h1>
                        <p className='mt-4 tracking-wide'>Welcome back <br />You&apos;ve been missed!</p>
                        <div className='flex items-center justify-center w-full mt-2'>
                            <div className='bg-[#FF4C51] w-16 h-[5px] rounded-full mr-1'> </div>
                            <div className='bg-[#685ED4] w-[20px] h-[5px] rounded-full mr-1'></div>
                            <div className='bg-[#685ED4] w-[5px] h-[5px] rounded-full'></div>
                        </div>
                    </div>

                    <div className={`${mainDiv}`}>
                        <label className={`${labelStyle}`} htmlFor="email">Email</label>
                        <input className={`${inputStyle}`} type="email"
                            name='email' id='email' value={loginData.email} onChange={handleInput} />
                    </div>

                    <div className={`${mainDiv} relative`}>
                        <label className={`${labelStyle}`} htmlFor="password">
                            Password
                        </label>
                        <input className={`${inputStyle} pr-8`} type={`${eye ? 'password' : 'text'}`} name='password' id='password' value={loginData.password} onChange={handleInput} />
                        <div className='absolute bottom-2 right-2' onClick={handleEyeClick}>
                            {eye ? <VscEyeClosed /> :
                                <VscEye />}
                        </div>
                    </div>

                    <div className='w-full my-1 text-end'>
                        <Link to='/forgot-password' className='text-[#ff545a] text-[0.95rem] tracking-wide font-semibold'>Forgot Password?</Link>
                    </div>

                    <button type='submit' className='w-full mt-2 mb-4 bg-[#685ED4] hover:bg-[#FF4C51] transition-all duration-700 font-semibold rounded overflow-hidden text-white p-2 flex items-center justify-center'>
                        Login {loading && <div className='ml-4 ease-in-out mt-1 size-[1.25rem] border-[2.4px] border-t-[#46454546] animate-spin rounded-full bottom-0 '></div>}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
