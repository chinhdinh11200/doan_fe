import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useCreateThesis } from '../../hooks/thesis';
import { useDepartmentList } from '../../hooks/departments';
import Select from 'react-select';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStaffList } from '../../hooks/staffs';

function Dashboard() {

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useCreateThesis();
  const { data: departments } = useDepartmentList();
  const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
  staffs?.map(staff => {
    staff.label = staff.name
    staff.value = staff.id

    return staff;
  })
  departments?.data?.map(department => {
    department.label = department.name
    department.value = department.id

    return department;
  })

  const schema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập mục này'),
    code: yup.string().required('Vui lòng nhập mục này').min(4, "Mã luận án/ luận v không được nhỏ hơn 4 kí tự."),
    date_decision: yup.date().required(),
    num_person: yup.number().required(),
    course: yup.string().required()
  })
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
    setValue,
    control,
  } = useForm({
  
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: '',
      code: '',
      date_decision: '',
      num_decision: '',
      course:'',
      num_person:'',
    }
  })
  useEffect(() => {
    console.log("dataCreate");
    if (dataCreate) {
      navigate('/thesis-list');
    }
  }, [isSuccess]);

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
           text-white hover:text-slate-800 hover:bg-white hover:border-slate-800'> Thêm luận án / luận văn</span></div>
          <div className="w-full">
            <div className="border-b border-gray-900/10 pb-12">
              <form
                name='add-compilation'
                onSubmit={handleSubmit((values) => {
                  console.log(values);
                  mutate(values)
                })}
              >
                <div className="col-span-full mb-2">
                  <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã luận án / luận văn</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="code"
                      id="code"
                      autoComplete="code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('code', { required: true })}
                    />
                    {errors.code && <p className="text-red-500">{errors.code.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Họ tên NCS/Học viên/ Sinh viên </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('name', { required: true })}
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2">
                  <label htmlFor="num_decision" className="block text-sm font-medium leading-6 text-gray-900">Số QĐ giao nhiệm vụ</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="num_decision"
                      id="num_decision"
                      autoComplete="num_decision"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('num_decision', { required: true })}
                    />
                    {errors.num_decision && <p className="text-red-500">{errors.num_decision.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2">
                  <label htmlFor="date_decision" className="block text-sm font-medium leading-6 text-gray-900">Ngày ký QĐ giao nhiệm vụ</label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="date_decision"
                      id="date_decision"
                      autoComplete="date_decision"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('date_decision', { required: true })}
                    />
                    {errors.date_decision && <p className="text-red-500">{errors.date_decision.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2">
                  <label htmlFor="course" className="block text-sm font-medium leading-6 text-gray-900">Khóa đào tạo</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="course"
                      id="course"
                      autoComplete="course"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('course', { required: true })}
                    />
                    {errors.course && <p className="text-red-500">{errors.course.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2">
                  <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Vai trò</label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name="role"
                      render={({ field: { value, onChange, ref } }) => (
                        <Select
                          options={staffs}
                          name="role"
                          id="role"
                          isMulti
                          placeholder="Lựa chọn"
                          {...register('role')}
                          onChange={(val) => {
                            let rol = val.map(item => item.value).join(',')
                            setValue('role', rol)
                          }}
                        />
                      )}
                    />
                    {errors.role && <p className="text-red-500">{errors.role.message}</p>}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
                  <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
                </div>
              </form>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;