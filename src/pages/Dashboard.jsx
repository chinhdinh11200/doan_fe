import React, { useContext, useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import EditMenu from '../partials/EditMenu';
import { UserContext } from '../context/userInfo';
import axios from '../config/axios';
import API from '../constants/api'
import { useYearList } from '../hooks/year';
import { Select } from 'antd';
import moment from 'moment';
import { useStaffList } from '../hooks/staffs';


function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState({});
  const [year, setYear] = useState(null);
  const [userExport, setUserExport] = useState(null);
  const { user } = useContext(UserContext);
  const [disabled, setDisabled] = useState(false)
  const { data: { data: years = [] } = {} } = useYearList();
  const { data: { data: users = [] } = {} } = useStaffList();
  years?.map(year => {
    year.label = year.name
    year.value = year.id

    return year;
  })
  users?.map(user => {
    user.label = user.name
    user.value = user.id

    return user;
  })
  useEffect(() => {
    if (years) {
      setDefaultValue(years[0])
      setYear(years[0]?.id)
    }
  }, [years])
  if (defaultValue) {
    // return
  }
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="flex justify-between items-center mb-4">

              {/* Datepicker built with flatpickr */}
              {/* <Datepicker /> */}
              <div className='flex gap-3'>
                <label for="year">Chọn năm</label>
                <div className=''>
                  { defaultValue && (<Select
                    className='w-[200px] h-[38px]'
                    options={years}
                    defaultValue={defaultValue}
                    onChange={(val) => {
                      setYear(val)
                    }}
                  />)}
                <label className='ml-2' for="user">Chọn giảng viên</label>
                  <Select
                    className='w-[200px] h-[38px]'
                    options={users}
                    onChange={(val, item) => {
                      console.log(val, item);
                      setUserExport({
                        id: val,
                        name: item.name
                      })
                    }}
                  />
                </div>
                <div className=''>
                      <button disabled={disabled} className='rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        onClick={() => {
                          setDisabled(true);
                          let id = user?.id;
                          if (!user?.department_id) {
                            id = userExport.id;
                          }
                          if (year != null) {
                            axios.get(
                              `${API.API_ROOT}${API.FILE.EXPORT}`.replace(':id', id),
                              {
                                responseType: 'blob',
                                params: {
                                  year: year,
                                }
                              },
                            ).then((response) => {
                              const url = window.URL.createObjectURL(new Blob([response.data]));
                              const link = document.createElement('a');
                              link.href = url;
                              let nameFile = "report" + `-${userExport.name}` + `-${moment(new Date()).format("DD-MM-YYYY")}-${Date.now()}.pdf`
                              link.setAttribute('download', nameFile);
                              document.body.appendChild(link);
                              link.click();
                              setDisabled(false)
                            }).catch(() => {
                              setDisabled(false)
                            }) 
                          } else {

                          }
                        }}
                      >
                        Xuất File
                      </button>
                    </div>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {
                user?.department_id && user?.department_id != 1 ? <DashboardCard12 /> : null
              }
              {
                user?.department_id && user?.department_id != 1 ? <DashboardCard10 /> : null
              }
              {
                user?.department_id && user?.department_id != 1 ? <DashboardCard07 /> : null
              }

              {/* <DashboardCard10 />


              <DashboardCard10 />


              <DashboardCard07 /> */}


            </div>

          </div>
        </main>

        {/* <EditMenu /> */}

      </div>
    </div>
  );
}

export default Dashboard;