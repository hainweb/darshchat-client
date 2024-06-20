import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";

const CheckEmailPage = () => {
  const [data,setData] = useState({
    email : "",
  })
  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`

    try {
        const response = await axios.post(URL,data)

        toast.success(response.data.message)

        if(response.data.success){
            setData({
              email : "",
            })
            navigate('/password',{
              state : response?.data?.data
            })
        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
  }


  return (
    <div className='mt-5'>
        <div className='loginshadow bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

            <div className='w-fit mx-auto mb-2'>
                <PiUserCircle
                  size={80}
                />
            </div>

          <h3>Welcome to Chat app!</h3>

          <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
              

              <div className='flex flex-col gap-1'>
                <label htmlFor='email'>User name </label>
                <input
                  type='text'
                  id='email'
                  name='email'
                  placeholder='Enter user name' 
                  className='placeholder-chek-input bg-slate-100 px-2 py-1 focus:outline-blue-700'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <button 
               className='bg-blue-600  text-lg  px-4 py-1 hover:bg-blue-700 rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
              >
                Login
              </button>

          </form>

          <p className='my-3 text-center'>New User ? <Link to={"/register"} className='text-blue-500 hover:text-blue-700 font-semibold'>Create an account</Link></p>
        </div>
    </div>
  )
}

export default CheckEmailPage
