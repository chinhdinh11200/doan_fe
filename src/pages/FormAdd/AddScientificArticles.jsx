import React, { useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className='bg-white w-9/12 mx-auto p-8 shadow-md my-4'>
          <div className='py-5 mb-4 w-auto text-center'><span className='p-3 rounded-lg bg-slate-800 border
           text-white hover:text-slate-800 hover:bg-white hover:border-slate-800'>Thêm bài báo khoa học</span></div>
          <div className="w-full">
            <div className="border-b border-gray-900/10 pb-12">
         
              <div className="col-span-full my-3">
                <label for="CountPerson" className="block text-sm font-medium leading-6 text-gray-900 capitalize">Mã Bài báo</label>
                <div className="mt-2">
                  <input type="number" name="CountPerson" id="CountPerson" autocomplete="CountPerson" className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="col-span-full my-3">
                <label for="name" className="block text-sm font-medium leading-6 text-gray-900 capitalize">tên bài báo</label>
                <div className="mt-2">
                  <input type="text" name="name" id="name" autocomplete="name" className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="col-span-full my-3">
                <label for="course" className="block text-sm font-medium leading-6 text-gray-900 capitalize">Chỉ số tạp chí/ hội nghị</label>
                <div className="mt-2">
                  <input type="text" name="course" id="course" autocomplete="course" className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="col-span-full my-3">
                <label for="numberDecide" className="block text-sm font-medium leading-6 text-gray-900 capitalize">số người tham gia</label>
                <div className="mt-2">
                  <input type="number" name="numberDecide" id="numberDecide" autocomplete="numberDecide" className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="col-span-full my-3">
                <label for="CountPerson" className="block text-sm font-medium leading-6 text-gray-900 capitalize">Chọn Thể loại:</label>
                <div className="mt-2">
                <select className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="1"> Tạp chí</option>
                  <option value="2">Hội nghị</option>
                </select>
                </div>
              </div>
              <div className="col-span-full my-3">
                <label for="CountPerson" className="block text-sm font-medium leading-6 text-gray-900 capitalize">Chọn Vai trò:</label>
                <div className="mt-2">
                <select className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="1">Tác giả chính</option>
                  <option value="2">Thành viên</option>
                </select>
                </div>
              </div>
              <div className="col-span-full my-3">
                <label for="numberDecide" className="block text-sm font-medium leading-6 text-gray-900 capitalize">tổng thời gian</label>
                <div className="mt-2">
                  <input type="text" name="numberDecide" id="numberDecide" autocomplete="numberDecide" className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;