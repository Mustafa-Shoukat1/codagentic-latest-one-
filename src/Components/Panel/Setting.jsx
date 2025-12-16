import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { slowTimeout } from '../../animationConfig';
import { useNavigate } from 'react-router'

const Setting = ({ setCurrentindex, admin }) => {
    const navi = useNavigate()

    const url = import.meta.env.VITE_SERVER;
    const [newEmail, setNewEmail] = useState('')
    const [error, setError] = useState('')
    const [pemail, setPemail] = useState('')
    const [cemail, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [mainAddress, setMainAddress] = useState('');
    const [branch1Address, setBranch1Address] = useState('');
    const [branch2Address, setBranch2Address] = useState('');
    const currentEmail = admin.email
    const email = admin.email

    const [currentPassword, setPassword] = useState('');
    const [newPassword, setNewpassword] = useState('');

    const [passwordtype, setPasswordtype] = useState('password');

    const handeleye = () => {
        setPasswordtype(prev => (prev === 'password' ? 'text' : 'password'));
    };
    const getdata = async () => {

        try {
            const res = await axios.get(`${url}/contact`);
            if (res.status === 200) {
                console.log(res)
                setPemail(res.data.contact[0].cemail)
                setEmail(res.data.contact[0].cemail)
                setWhatsapp(res.data.contact[0].whatsapp)
                setLinkedin(res.data.contact[0].linkedin)
                setMainAddress(res.data.contact[0].mainAddress)
                setBranch1Address(res.data.contact[0].branch1Address)
                setBranch2Address(res.data.contact[0].branch2Address)
            } else {
                setError('Failed to load data');
            }
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        }
    }
    useEffect(() => {
        getdata()

    }, [])


    const upemail = () => {
        console.log('e')
        axios.post(`${url}/upadmin`, { currentEmail, newEmail })
            .then((res) => {
                console.log(res)
                setError('Email updated successfully! Logging out...')
                setTimeout(() => {
                    localStorage.removeItem('token')
                    navi('/Login')

                }, slowTimeout(3000));
            })
            .catch((err) => {
                console.log(err)
            })

    }
    const uppassword = () => {
        console.log('p')
        axios.post(`${url}/uppassword`, { email, currentPassword, newPassword })
            .then((res) => {
                console.log(res)
                setError('Password updated successfully! Logging out...')
                setTimeout(() => {
                    localStorage.removeItem('token')
                    navi('/Login')

                }, slowTimeout(3000));
            })
            .catch((err) => {
                console.log(err)
                setError(err.response.data.message)
                setTimeout(() => {
                    // localStorage.removeItem('token')
                    setError('')
                    // navi('/Login')

                }, slowTimeout(3000));
            })

    }

    const addcontactinfo = async (e) => {
        e.preventDefault();

        const contactData = {
            cemail,
            whatsapp,
            linkedin,
            mainAddress,
            branch1Address,
            branch2Address,
        };




        try {
            const response = await axios.post(`${url}/addcontact`, contactData);

            if (response.status === 201) {
                setError('Contact info added successfully!');
                setEmail('');
                setWhatsapp('');
                setLinkedin('');
                setMainAddress('');
                setBranch1Address('');
                setBranch2Address('');
            } else {
                setError('Something went wrong: ' + response.data.message);
            }
        } catch (error) {
            console.error(error);
            setError('Error: ' + (error.response?.data?.err || error.message));
        }
    };
    const upcontactinfo = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${url}/upcontact`, {
                pemail,
                cemail,
                whatsapp,
                linkedin,
                mainAddress,
                branch1Address,
                branch2Address
            });

            if (response.status === 200) {
                console.log('Contact updated:', response.data.updatedContact);
                setError('Contact updated successfully!');
            } else {
                console.log('Update failed:', response.data);
                setError('Update failed');
            }
        } catch (error) {
            console.error('Error updating contact:', error);
            setError('An error occurred while updating contact');
        }
    };
    return (
        <div className='container mx-auto'>
            <p className='text-red-500 w-1/2 mx-auto' >{error}</p>

            <div>
                <div className='w-1/2 mx-auto px-8 pt-5 text-xl'>
                    Contact Info
                </div>

                <div className='w-full mx-auto lg:w-1/2 '>
                    <form onSubmit={upcontactinfo} className='p-8 space-y-4 w-full x-auto flex flex-col'>

                        <div className='w-full relative'>
                            <label className='text-lg  text-gray-400'>Email:</label>
                            <input
                                required
                                type='email'
                                className='p-3 border-[1px] border-gray-500 w-full rounded-lg'
                                value={cemail} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='w-full relative'>
                            <label className='text-lg  text-gray-400'>Whatsapp:</label>
                            <input
                                required
                                type='tel'
                                className='p-3 border-[1px] border-gray-500 w-full rounded-lg'
                                value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                            />
                        </div>
                        <div className='w-full relative'>
                            <label className='text-lg  text-gray-400'>Linkiden:</label>
                            <input
                                required
                                type='text'
                                className='p-3 border-[1px] border-gray-500 w-full rounded-lg'
                                value={linkedin} onChange={(e) => setLinkedin(e.target.value)}
                            />
                        </div>
                        <div className='w-full relative'>
                            <label className='text-lg  text-gray-400'>Head Office Address:</label>
                            <input
                                required
                                type='text'
                                className='p-3 border-[1px] border-gray-500 w-full rounded-lg'
                                value={mainAddress} onChange={(e) => setMainAddress(e.target.value)}
                            />
                        </div>
                        <div className='w-full relative'>
                            <label className='text-lg  text-gray-400'>Branch 1 Address:</label>
                            <input
                                required
                                type='text'
                                className='p-3 border-[1px] border-gray-500 w-full rounded-lg'
                                value={branch1Address} onChange={(e) => setBranch1Address(e.target.value)}
                            />
                        </div>
                        <div className='w-full relative'>
                            <label className='text-lg  text-gray-400'>Branch 2 Address:</label>
                            <input
                                required
                                type='text'
                                className='p-3 border-[1px] border-gray-500 w-full rounded-lg'
                                value={branch2Address} onChange={(e) => setBranch2Address(e.target.value)}
                            />
                        </div>
                        <input type="submit" value={'Update'} className='bg-blue-500 p-3 uppercase  rounded-md hover:opacity-70 cursor-pointer place-self-end w-1/3 ' />
                        {/* <button type='submit' className='bg-blue-500 p-3 uppercase  rounded-md hover:opacity-70 cursor-pointer place-self-end w-1/3 '></button> */}
                    </form>


                </div>
            </div>
            <div className='w-1/2 mx-auto px-8 text-xl'>
                Personal Info
            </div>
            <div className='px-8 py-4 space-y-2 w-1/2 mx-auto flex flex-col gap-4 border-gray-500' >
                <div>

                    <label className='text-lg  text-gray-400'>Current Email:</label>

                    <input type="email" value={admin.email} disabled className='opacity-70 cursor-not-allowed p-3 border-[1px] border-gray-500 w-full rounded-lg' />
                </div>
                <div>

                    <label className='text-lg  text-gray-400'>New Email:</label>
                    <input type="email" onChange={(e) => setNewEmail(e.target.value)} className='opacity-70 p-3 border-[1px] border-gray-500 w-full rounded-lg' />
                </div>
                <button onClick={upemail} disabled={newEmail === "" ? true : false} className='bg-blue-500 p-3 uppercase  rounded-md hover:opacity-70 cursor-pointer place-self-end w-1/3 '>Update</button>

            </div>
            <div>


                <div className='p-8 border-t space-y-2 w-1/2 mx-auto flex flex-col border-gray-500'>
                    <label className='text-lg  text-gray-400'>Current password:</label>
                    <div className='w-full relative'>
                        <input
                            required
                            type={passwordtype}
                            className='p-3 border-[1px] border-gray-500 w-full rounded-lg'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <label className='text-lg  text-gray-400'>New password:</label>
                    <div className='w-full relative'>
                        <input
                            required
                            type={passwordtype}
                            className='p-3 border-[1px] border-gray-500 w-full rounded-lg'
                            onChange={(e) => setNewpassword(e.target.value)}
                        />
                    </div>

                    <div className='flex items-center gap-2 px-2'>
                        <input type='checkbox' onChange={handeleye} id='show-password' />
                        <label htmlFor='show-password'>Show Password</label>
                    </div>
                    <button onClick={uppassword} disabled={newPassword === "" || currentPassword === "" ? true : false} className='bg-blue-500 p-3 uppercase  rounded-md hover:opacity-70 cursor-pointer place-self-end w-1/3 '>Update</button>


                </div>
            </div>

        </div>
    );
};

export default Setting;
