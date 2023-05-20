import React from 'react'

export default function ResetPassword() {
  return (
    <div className='h-screen flex justify-center items-center max-w-[400px] w-full m-auto'>
            <form className='w-full p-4'>
                <button className='border w-full mt-5 mb-2 py-2 bg-red-700 hover:bg-white hover:text-red-700 hover:border-red-700 rounded-full text-white font-bold'>Gửi email</button>
                <div className='text-sm text-center'>
                    <a href='/' className='underline'>Quay lại</a>
                </div>
            </form>
            </div>
  )
}