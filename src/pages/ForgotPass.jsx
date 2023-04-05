import React from 'react'

export default function Login() {
  return (
    <div className='h-screen flex justify-center items-center max-w-[400px] w-full m-auto'>
            <form className='w-full p-4'>
                <h2 className='text-4xl font-bold text-center py-8 text-red-700'>Quên Mật Khẩu</h2>
                <p className='text-sm'>Vui lòng nhập lại email đã đăng kí để lấy lại mật khẩu của bạn!</p>
                <div className='flex flex-col py-2'>
                    <input className='text-sm border border-white' type="text" placeholder='Email'/>
                </div>
                <button className='border w-full mt-5 mb-2 py-2 bg-red-700 hover:bg-white hover:text-red-700 hover:border-red-700 rounded-full text-white font-bold'>Gửi email</button>
                <div className='text-sm text-center'>
                    <a href='/' className='underline'>Quay lại</a>
                </div>
            </form>
            </div>
  )
}