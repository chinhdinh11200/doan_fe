import React from 'react'

import loginImg from '../images/logohv.png'

export default function Login() {
    return (
        <div className='relative h-screen flex justify-center items-center max-w-[400px] w-full m-auto'>
            <div
                className="absolute max-h-[400px] m-auto inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <form className='relative bg-white w-full p-4 rounded-3xl'>
                <h2 className='text-4xl font-bold text-center py-8 text-blue-600'>LOGIN</h2>
                <div className='flex flex-col py-2'>
                    <input className='text-sm border border-gray-200' required type="text" placeholder='Mã Nhân Viên' />
                </div>
                <div className='flex flex-col py-2'>

                    <input className='text-sm border border-gray-200' required type="password" placeholder='Mật Khẩu' />
                </div>
                <button className='border w-full mt-5 mb-2 py-2 bg-blue-600 hover:bg-white hover:text-blue-600 hover:border-blue-600 rounded-full text-white font-bold'>
                    <a href='/dashboard'>Đăng Nhập</a></button>
                <div className='text-sm '>
                    <a href='/forgotpassword' className='underline'>Quên mật khẩu</a>
                </div>
            </form>
        </div>
    )
}