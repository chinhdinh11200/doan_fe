import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';



function EditAccount() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="my-10 mx-auto container max-w-2xl md:w-3/4 shadow-md">
                        <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
                            <div className="max-w-sm mx-auto md:w-full md:mx-0">
                                <div className="inline-flex items-center space-x-4">
                                    <img
                                        className="w-10 h-10 object-cover rounded-full"
                                        alt="User avatar"
                                        src="https://avatars3.githubusercontent.com/u/72724639?s=400&u=964a4803693899ad66a9229db55953a3dbaad5c6&v=4"
                                    />
                                    <h1 className="text-gray-600">Hà Lê</h1>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white space-y-6">
                        <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
                                <h2 className="md:w-1/3 mx-auto max-w-sm">Tài khoản</h2>
                                <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                                    <div>
                                        <label className="text-sm text-gray-400">Email</label>
                                        <div className="w-full inline-flex border">
                                        
                                            <input
                                                type="email"
                                                className="w-full focus:outline-none focus:text-gray-600 p-2"
                                                placeholder="halee7@gmail.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400">Mã nhân viên</label>
                                        <div className="w-full inline-flex border">
                                            <input
                                                type="text"
                                                className="w-full bg-slate-100 focus:outline-none focus:text-gray-600 p-2"
                                                placeholder="GT000"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
                                <h2 className="md:w-1/3 mx-auto max-w-sm">Thông tin cá nhân</h2>
                                <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                                    <div>
                                        <label className="text-sm text-gray-400">Họ Tên</label>
                                        <div className="w-full inline-flex border">
                                        
                                            <input
                                                type="text"
                                                className="w-full bg-slate-100 focus:outline-none focus:text-gray-600 p-2"
                                                placeholder="Hà Lê"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400">Ngày sinh</label>
                                        <div className="w-full inline-flex border">
                                        
                                            <input
                                                type="date"
                                                className="w-full focus:outline-none focus:text-gray-600 p-2"
                                                placeholder="00/00/0000"
                                                
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400">Số điện thoại</label>
                                        <div className="w-full inline-flex border">
                                           
                                            <input
                                                type="text"
                                                className="w-full focus:outline-none focus:text-gray-600 p-2"
                                                placeholder="12341234"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400">Học hàm/học vị</label>
                                        <div className="w-full inline-flex border">
                                           
                                            <input
                                                type="text"
                                                className="w-full focus:outline-none focus:text-gray-600 p-2"
                                                placeholder="Học hàm/học vị"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400">Chức vụ</label>
                                        <div className="w-full inline-flex border">
                                           
                                            <input
                                                type="text"
                                                className="w-full focus:outline-none focus:text-gray-600 p-2"
                                                placeholder="Chức vụ"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
                                <h2 className="md:w-4/12 max-w-sm mx-auto">Thay đổi mật khẩu</h2>

                                <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 pl-2">
                                    <div className="w-full inline-flex border-b">
                                        <input
                                            type="password"
                                            className="w-full focus:outline-none focus:text-gray-600 p-2"
                                            placeholder="Mật khẩu cũ"
                                        />
                                    </div>
                                    <div className="w-full inline-flex border-b">
                                       
                                        <input
                                            type="password"
                                            className="w-full focus:outline-none focus:text-gray-600 p-2"
                                            placeholder="Mật khẩu mới"
                                        />
                                    </div>
                                    <div className="w-full inline-flex border-b">
                                       
                                        <input
                                            type="password"
                                            className="w-full focus:outline-none focus:text-gray-600 p-2"
                                            placeholder="Nhập lại khẩu mới"
                                        />
                                    </div>
                                </div>

                                <div className="md:w-3/12 text-center md:pl-6">
                                    <button className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right">
                                        <svg
                                            fill="none"
                                            className="w-4 text-white mr-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            />
                                        </svg>
                                        Cập nhật
                                    </button>
                                </div>
                            </div>

                            <hr />
                            <div className="w-full p-4 text-right text-gray-500">
                                <button className='bg-blue-600 rounded-md p-2 text-white'>
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
};

export default EditAccount;