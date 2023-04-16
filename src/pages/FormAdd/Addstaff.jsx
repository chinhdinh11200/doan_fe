import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useCreateStaff } from '../../hooks/staffs';
import { useDepartmentList } from '../../hooks/departments';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useCreateStaff();
  const { data: departments } = useDepartmentList();
  departments?.data?.map(department => {
    department.label = department.name
    department.value = department.id

    return department;
  })

  const schema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập tên nhân viên').max(191, 'Tên không dài quá 191 kí tự'),
    email: yup.string().trim().required('Vui lòng nhập email').matches(
      /^([a-z0-9_+.-]+)(\.[a-z0-9_-]+)*@([a-z0-9_-]+\.)+[a-z]{2,6}$/,
      "Email không đúng định dạng"
    ).max(191, 'Email không quá 191 kí tự'),
    password: yup.string().min(8, "Mật khẩu không được nhỏ hơn 8 kí tự."),
    code: yup.string().required('Vui lòng nhập mã nhân viên').min(4, "Mã nhân viên không được nhỏ hơn 4 kí tự."),
    position: yup.string(),
    // department_id: yup.string().required('Trường phòng ban là bắt buộc.'),
    number_salary: yup.number(),
    income: yup.number(),
    time_per_year: yup.number(),
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
      email: '',
      password: '',
      position: '',
    }
  })

  useEffect(() => {
    console.log(dataCreate);
    if (dataCreate) {
      navigate('/ListStaff');
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
           text-white hover:text-slate-800 hover:bg-white hover:border-slate-800'> Thêm Nhân Viên</span></div>
          <div className="w-full">
            <div className="border-b border-gray-900/10 pb-12">
              <form
                name='add-staff'
                onSubmit={handleSubmit((values) => {
                  console.log(values);
                  mutate(values)
                })}
              >
                <div className="col-span-full">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên Nhân Viên</label>
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
                <div className="col-span-full">
                  <label htmlFor="department_id" className="block text-sm font-medium leading-6 text-gray-900">Phòng ban</label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name="category_id"
                      render={({ field: { value, onChange, ref } }) => (
                        <Select
                          options={departments?.data}
                          name="department_id"
                          id="department_id"
                          placeholder="Lựa chọn"
                          {...register('department_id')}
                          onChange={(val) => {
                            onChange(val);
                            setValue("department_id", val.id);
                          }}
                        />
                      )}
                    />

                    {errors.department_id && <p className="text-red-500">{errors.department_id.message}</p>}
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã nhân viên</label>
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
                <div className="col-span-full">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('email', { required: true })}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Mật khẩu</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="password"
                      id="password"
                      autoComplete="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('password', { required: true })}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">Vị trí</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="position"
                      id="position"
                      autoComplete="position"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('position', { required: true })}
                    />
                    {errors.position && <p className="text-red-500">{errors.position.message}</p>}
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="number_salary" className="block text-sm font-medium leading-6 text-gray-900">Hệ số lương</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="number_salary"
                      id="number_salary"
                      autoComplete="number_salary"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('number_salary', { required: true })}
                    />
                    {errors.number_salary && <p className="text-red-500">{errors.number_salary.message}</p>}
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="income" className="block text-sm font-medium leading-6 text-gray-900">Thu nhập</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="income"
                      id="income"
                      autoComplete="income"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('income', { required: true })}
                    />
                    {errors.income && <p className="text-red-500">{errors.income.message}</p>}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
                  <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
                </div>
              </form>
              {/* <div className="col-span-full">
                <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Mã Nhân Viên</label>
                <div className="mt-2">
                  <input type="text" name="name" id="name" autocomplete="name" className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div> */}
              {/* <div className="col-span-full">
                <label for="course" className="block text-sm font-medium leading-6 text-gray-900">Tên Nhân Viên</label>
                <div className="mt-2">
                  <input type="text" name="course" id="course" autocomplete="course" className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div> */}
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;