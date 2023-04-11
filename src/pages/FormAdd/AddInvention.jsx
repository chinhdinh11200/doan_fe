import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useCreateInventions } from '../../hooks/inventions';
import { useDepartmentList } from '../../hooks/departments';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const role = [
  {
    label: "Tác giả chính",
    value: 1
  },
  {
    label: "Thành viên",
    value: 2
  },
];

function Dashboard() {

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useCreateInventions();
  const { data: departments } = useDepartmentList();
  departments?.data?.map(department => {
    department.label = department.name
    department.value = department.id

    return department;
  })

  const schema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập tên bẳng sáng chế/giải thưởng'),
    code: yup.string().required('Vui lòng nhập mã tên bẳng sáng chế/giải thưởng').min(4, "Mã tên bẳng sáng chế/giải thưởng không được nhỏ hơn 4 kí tự."),
    num_person: yup.number(),
    // department_id: yup.string().required('Trường phòng ban là bắt buộc.'),
    date_recognition: yup.date(),
    number_recognition: yup.string(),
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
      date_recognition: '',
      num_person: '',
      number_recognition: '',
      level: '',
    }
  })

  useEffect(() => {
    console.log(dataCreate);
    if (dataCreate) {
      navigate('/invention-list');
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
 text-white hover:text-slate-800 hover:bg-white hover:border-slate-800'> Thêm bằng sáng chế / giải thưởng</span></div>
          <div className="w-full">
            <div className="border-b border-gray-900/10 pb-12">
              <form
                name='add-scientific-articles'
                onSubmit={handleSubmit((values) => {
                  console.log(values);
                  mutate(values)
                })}
              >
                <div className="col-span-full mb-2.5">
                  <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã bằng sáng chế/giải thưởng</label>
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
                <div className="col-span-full mb-2.5">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên bằng sáng chế/giải thưởng</label>
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
                <div className="col-span-full mb-2.5">
                  <label htmlFor="num_person" className="block text-sm font-medium leading-6 text-gray-900">Số người tham gia</label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="num_person"
                      id="num_person"
                      autoComplete="num_person"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('num_person', { required: true })}
                    />
                    {errors.num_person && <p className="text-red-500">{errors.num_person.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2.5">
                  <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Vai trò</label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name="role"
                      render={({ field: { value, onChange, ref } }) => (
                        <Select
                          options={role}
                          name="role"
                          id="role"
                          placeholder="Lựa chọn"
                          {...register('role')}
                          onChange={(val) => {
                            onChange(val);
                            setValue("role", val.id);
                          }}
                        />
                      )}
                    />
                    {errors.role && <p className="text-red-500">{errors.role.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2.5">
                  <label htmlFor="date_recognition" className="block text-sm font-medium leading-6 text-gray-900">Ngày QĐ công nhận</label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="date_recognition"
                      id="date_recognition"
                      autoComplete="date_recognition"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('date_recognition', { required: true })}
                    />
                    {errors.date_recognition && <p className="text-red-500">{errors.date_recognition.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2.5">
                  <label htmlFor="number_recognition" className="block text-sm font-medium leading-6 text-gray-900">Số QĐ công nhận</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="number_recognition"
                      id="number_recognition"
                      autoComplete="number_recognition"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('number_recognition', { required: true })}
                    />
                    {errors.number_recognition && <p className="text-red-500">{errors.number_recognition.message}</p>}
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
