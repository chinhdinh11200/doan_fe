import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useCreateArticle } from '../../hooks/articles';
import { useDepartmentList } from '../../hooks/departments';
import Select from 'react-select';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStaffList } from '../../hooks/staffs';

const type_article = [
  {
    label: "Tạp chí",
    value: 4
  },
  {
    label: "Hội nghị",
    value: 5
  },
]
function Dashboard() {

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useCreateArticle();
    const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
    staffs?.map(staff => {
      staff.label = staff.name
      staff.value = staff.id
  
      return staff;
    })
  const { data: departments } = useDepartmentList();
  departments?.data?.map(department => {
    department.label = department.name
    department.value = department.id

    return department;
  })
  const schema = yup.object().shape({
    // name: yup.string().trim().required('Vui lòng nhập tên bài báo'),
    // code: yup.string().required('Vui lòng nhập mã bài báo').min(4, "Mã bài báo không được nhỏ hơn 4 kí tự."),
    // index_article: yup.string(),
    // total_time: yup.number(),
    // num_person: yup.number()
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
      type_article: '',
      code: '',
      index_article: '',
      total_time: '',
      num_person: '',
      role: '',
      type: 2,
    }
  })

  useEffect(() => {
    if (dataCreate?.data.success) {
      navigate('/scientific-article-list');
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
           text-white hover:text-slate-800 hover:bg-white hover:border-slate-800'> Thêm bài báo</span></div>
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
                  <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã bài báo</label>
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
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 capitalize">Tên bài báo</label>
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
                  <label htmlFor="type_article" className="block text-sm font-medium leading-6 text-gray-900">Thể loại</label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name="typeArticle"
                      render={({ field: { value, onChange, ref } }) => (
                        <Select
                          options={type_article}
                          name="type_article"
                          id="type_article"
                          placeholder="Lựa chọn"
                          {...register('type_article')}
                          onChange={(val) => {
                            onChange(val);
                            setValue("type_article", val.id);
                          }}
                        />
                      )}
                    />
                    {errors.type_article && <p className="text-red-500">{errors.type_article.message}</p>}
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
                          options={staffs}
                          name="role"
                          id="role"
                          isMulti
                          placeholder="Lựa chọn"
                          {...register('role')}
                          onChange={(val) => {
                            let rol = val.map(item => item.value).join(',')
                            setValue('role', rol);
                          }}
                        />
                      )}
                    />
                    {errors.role && <p className="text-red-500">{errors.role.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2.5">
                  <label htmlFor="index_article" className="block text-sm font-medium leading-6 text-gray-900">Chỉ số tạp chí/ hội nghị</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="index_article"
                      id="index_article"
                      autoComplete="index_article"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('index_article', { required: true })}
                    />
                    {errors.index_article && <p className="text-red-500">{errors.index_article.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2.5">
                  <label htmlFor="total_time" className="block text-sm font-medium leading-6 text-gray-900">Tổng thời gian</label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="total_time"
                      id="total_time"
                      autoComplete="total_time"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('total_time', { required: true })}
                    />
                    {errors.total_time && <p className="text-red-500">{errors.total_time.message}</p>}
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