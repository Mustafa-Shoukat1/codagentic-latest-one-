import { useState } from "react";
import React from "react";
import { slowTimeout } from '../animationConfig';

import axios from 'axios'

import { EyeClosed, Eye, MoveLeft } from 'lucide-react';

import { useNavigate } from 'react-router'




const Login = () => {
    const url = import.meta.env.VITE_SERVER;
    const navi = useNavigate()

    const [email, setEmail] = useState('')
    const [disabled,setDisabled] = useState(false)
    const [password, setPassword] = useState()
    const [error, setError] = useState(null);
    const [passwordtype, setPasswordtype] = useState("password")

    const handeleye = () => {
        if (passwordtype === 'password') {
            setPasswordtype('text');
        } else {
            setPasswordtype('password');
        }
    };

    const handellogin2 = async (e) => {
        e.preventDefault();
        setDisabled(true)
        axios.post(`${url}/adminrigister`, { email, password })
            .then(result => {
                if (result.data.status === 'adminalready') {
                    setDisabled(false)

                    setError('Admin Already Exist!')
                    console.log(result)
                    setTimeout(() => {
                        setError('')

                    }, slowTimeout(2000));
                } else if (result.data.email === email) {
                    console.log(result)

                } else {
                      setDisabled(false)

                    setError('Internal Server Error !')
                    setTimeout(() => {
                        setError('')
                    }, slowTimeout(2000));
                    console.log(result)


                }

            })
            .catch(error => console.log(error))


    }
    const handellogin = (e) => {
        e.preventDefault();
        setDisabled(true)

        axios.post(`${url}/login`, { email, password })
            .then((res) => {
                const data = res.data
                if (data.status == 'noadmin') {
                    console.log('noadmin')
                    setDisabled(false)
                    setError('Invalid Email and Password')
                    setTimeout(() => {
                        setError('')

                    }, slowTimeout(3000));
                }
                else if (data.status == 'nopass') {
                    setDisabled(false)
                    setError('Invalid Email and Password')
                    setTimeout(() => {
                        setError('')

                    }, 3000);
                }

                else if (data.token) {
                    const token = localStorage.getItem('token')
                    if (token) {
                        localStorage.removeItem('token')
                        localStorage.setItem('admin', JSON.stringify(data.admin))
                        
                        localStorage.setItem('token', data.token)
                        navi('/Panel')
                    } else {
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('admin', JSON.stringify(data.admin))

                        navi('/Panel')
                    }

                }



            })
            .catch((err) => { 

                setDisabled(false)
                setError('Server Error. Try Again Later!')
                setTimeout(() => {
                    setError('')

                }, slowTimeout(3000));
            })

    }
    return (
        <div className='  bg-center w-full h-[100vh] text-white flex flex-col justify-center  items-center'>



            <div className='w-full  mx-4  bg-blue-900/5 backdrop-blur-3xl shadow-xl rounded-2xl  h-auto  lg:w-1/3   md:w-1/2  2xl:w-1/3    p-1  '>



                <div className='relative' >
                    <a href="/" className="absolute top-1 left-4">

                        <MoveLeft />
                    </a>
                    <form onSubmit={handellogin} className=' w-full gap-6 px-5 mt-2 py-6 flex flex-col'>

                        <label className='  text-center  font-medium text-2xl' >Login </label>
                        {error && <p className="text-red-500">{error}</p>}


                        <div className='flex flex-col '>

                            <label htmlFor="Email" className=' font-medium text-sm ' >Email Address</label>
                            <input type="email" required className='pt-2  focus:outline-none px-2 border-green bg-transparent border-x-0 border-t-0 border-b-2'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>


                        <div className='flex flex-col gap-1'>

                            <label className=' font-medium text-sm ' htmlFor="Password">Password</label>
                            <div className='w-full relative'>
                                <input required type={passwordtype} className='  pt-2 px-2 w-full border-green focus:outline-none bg-transparent border-b-2 border-x-0 border-t-0'
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                {
                                    passwordtype === 'password' ? <button type="button" className=' !z-100  absolute rounded-t-md top-2     right-5  ' onClick={handeleye}><EyeClosed /></button> : <button type="button" className=' !z-100  absolute rounded-t-md top-2     right-5  ' onClick={handeleye}> <Eye /></button>

                                }


                            </div>
                        </div>
                        <a href='/Panel' >Already Login? <span className="text-green underline">click here</span></a>
                        <input type="submit"  disabled={disabled}  value={'Login Now'} className='text-white shadow-sm bg-[rgb(0,178,200)] hover:bg-[rgba(0,177,200,0.88)] active:bg-[rgba(0,177,200,0.94)] py-3 rounded-md mt-3' />
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login
