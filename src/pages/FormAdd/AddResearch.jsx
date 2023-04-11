import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useCreateTopic } from '../../hooks/research';
import { useDepartmentList } from '../../hooks/departments';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
const role = [
  {
    label: "Chủ trì",
    value: 1
  },
  {
    label: "Thư kí",
    value: 2
  },
  {
    label: "Thành viên",
    value: 3
  },
];
const result = [
  {
    label: "Đạt",
    value: 1
  },
  {
    label: "Giỏi",
    value: 2
  },
  {
    label: "Xuất sắc",
    value: 3
  },
];
const level = [
  {
    label: "Cơ sở",
    value: 1
  },
  {
    label: "Ban",
    value: 2
  },
  {
    label: "Nhà nước",
    value: 3
  },
]
function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useCreateTopic();
  const { data: departments } = useDepartmentList();
  departments?.data?.map(department => {
    department.label = department.name
    department.value = department.id

    return department;
  })

  const schema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập tên đề tài/dự án'),
    number_person: yup.string().trim().required('Vui lòng nhập số người tham gia'),
    code: yup.string().required('Vui lòng nhập mã đè tài/dự án.').min(4, "Mã dự án không được nhỏ hơn 4 kí tự."),
    num_person: yup.number(),
    endDate: yup.date(),
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
      level: '',
      endDate: '',
      result: '',
      num_person: '',
      type: 1,
    }
  })

  useEffect(() => {
    console.log(dataCreate);
    if (dataCreate) {
      navigate('/ResearchList');
    }
  }, [isSuccess]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className='bg-white w-9/12 mx-auto p-8 shadow-md my-4'>
          <div className='py-5 mb-4 w-auto text-center'><span className='p-3 rounded-lg bg-slate-800 border
           text-white hover:text-slate-800 hover:bg-white hover:border-slate-800'>Thêm nghiên cứu khoa học</span></div>
          <div className="w-full">
            <div className="border-b border-gray-900/10 pb-12">
            <form
                name='add-topic'
                onSubmit={handleSubmit((values) => {
                  mutate(values)
                })}
              >
                <div className="col-span-full mb-2.5">
                  <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã Dự án</label>
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
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên đề tài / dự án</label>
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
                  <label htmlFor="level" className="block text-sm font-medium leading-6 text-gray-900">Cấp đê tài</label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name="level"
                      render={({ field: { value, onChange, ref } }) => (
                        <Select
                          options={level}
                          name="level"
                          id="level"
                          placeholder="Lựa chọn"
                          {...register('level')}
                          onChange={(val) => {
                            onChange(val);
                            setValue("level", val.id);
                          }}
                        />
                      )}
                    />
                    {errors.level && <p className="text-red-500">{errors.level.message}</p>}
                  </div>
                </div>      
                <div className="col-span-full mb-2.5">
                  <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">Ngày bắt đầu</label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      autoComplete="startDate"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('startDate', { required: true })}
                    />
                    {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2.5">
                  <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">Ngày kết thúc</label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      autoComplete="endDate"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('endDate', { required: true })}
                    />
                    {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2.5">
                  <label htmlFor="acceptDate" className="block text-sm font-medium leading-6 text-gray-900">Ngày nghiệm thu</label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="acceptDate"
                      id="acceptDate"
                      autoComplete="acceptDate"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('acceptDate', { required: true })}
                    />
                    {errors.acceptDate && <p className="text-red-500">{errors.acceptDate.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2.5">
                  <label htmlFor="num_person" className="block text-sm font-medium leading-6 text-gray-900">
Số người tham gia</label>
                  <div className="mt-2">
                    <input
                      type="text"
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
                  <label htmlFor="result" className="block text-sm font-medium leading-6 text-gray-900">Kết quả đạt được</label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name="result"
                      render={({ field: { value, onChange, ref } }) => (
                        <Select
                          options={result}
                          name="result"
                          id="result"
                          placeholder="Lựa chọn"
                          {...register('result')}
                          onChange={(val) => {
                            onChange(val);
                            setValue("result", val.id);
                          }}
                        />
                      )}
                    />
                    {errors.result && <p className="text-red-500">{errors.result.message}</p>}
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