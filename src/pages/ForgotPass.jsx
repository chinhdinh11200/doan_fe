import React from 'react'

export default function Login() {
  return (
    <div className='h-screen flex justify-center items-center max-w-[400px] w-full m-auto'>
            <form className='w-full p-4'>
                <h2 className='text-4xl font-bold text-center py-8 text-blue-600'>Quên Mật Khẩu</h2>
                <p className='text-sm'>Vui lòng nhập lại email đã đăng kí để lấy lại mật khẩu của bạn!</p>
                <div className='flex flex-col py-2'>
                    <input className='text-sm border border-white' type="text" placeholder='Email'/>
                </div>
                <button className='border w-full mt-5 mb-2 py-2 bg-blue-600 hover:bg-white hover:text-blue-600 hover:border-blue-600 rounded-full text-white font-bold'>Gửi email</button>
                <div className='text-sm text-center'>
                    <a href='/' className='underline'>Quay lại</a>
                </div>
            </form>
            </div>
  )
}