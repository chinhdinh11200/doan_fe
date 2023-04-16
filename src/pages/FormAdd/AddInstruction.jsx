import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useCreateScientific } from '../../hooks/scientific';
import { useDepartmentList } from '../../hooks/departments';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const result_level = [
  {
    label: "Giải nhất",
    value: 1
  },
  {
    label: "Giải nhì",
    value: 2
  },
  {
    label: "Giải ba",
    value: 3
  },
  {
    label: "Giải khuyến khích",
    value: 4
  },
];
const result_level_2 = [
    {
      label: "Giải nhất",
      value: 1
    },
    {
      label: "Giải nhì",
      value: 2
    },
    {
      label: "Giải ba",
      value: 3
    },
    {
      label: "Giải khuyến khích",
      value: 4
    },
  ];
function Dashboard() {

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useCreateScientific();
  const { data: departments } = useDepartmentList();
  departments?.data?.map(department => {
    department.label = department.name
    department.value = department.id

    return department;
  })

  const schema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập tên đề tài'),
    code: yup.string().required('Vui lòng nhập mã đề tài').min(4, "Mã đề tài không được nhỏ hơn 4 kí tự."),
    date_decision: yup.date().required(),
    num_decision: yup.string().required(),
    num_credit: yup.number().required()
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
      num_credit:'',
      form_construction:'',
      type: 5,
    }
  })

  useEffect(() => {
    console.log("dataCreate");
    if (dataCreate) {
      navigate('/intruction-list');
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
           text-white hover:text-slate-800 hover:bg-white hover:border-slate-800'> Thêm Hướng Dẫn Sinh Viên NCKH</span></div>
          <div className="w-full">
            <div className="border-b border-gray-900/10 pb-12">
              <form
                name='add-scientific'
                onSubmit={handleSubmit((values) => {
                  console.log(values);
                  mutate(values)
                })}
              >
                <div className="col-span-full mb-2.5">
                  <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã đề tài</label>
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
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên đề tài </label>
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
                <div className="col-span-full mb-2.5">
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
                <div className="col-span-full mb-2.5">
                  <label htmlFor="result_level" className="block text-sm font-medium leading-6 text-gray-900">Kết quả bảo vệ cấp Khoa</label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name="result_level"
                      render={({ field: { value, onChange, ref } }) => (
                        <Select
                          options={result_level}
                          name="result_level"
                          id="result_level"
                          placeholder="Lựa chọn"
                          {...register('result_level')}
                          onChange={(val) => {
                            onChange(val);
                            setValue("result_level", val.id);
                          }}
                        />
                      )}
                    />
                    {errors.result_level && <p className="text-red-500">{errors.result_level.message}</p>}
                  </div>
                </div>
                <div className="col-span-full mb-2.5">
                  <label htmlFor="result_level_2" className="block text-sm font-medium leading-6 text-gray-900">Kết quả bảo vệ cấp Học viện</label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name="result_level_2"
                      render={({ field: { value, onChange, ref } }) => (
                        <Select
                          options={result_level_2}
                          name="result_level_2"
                          id="result_level_2"
                          placeholder="Lựa chọn"
                          {...register('result_level_2')}
                          onChange={(val) => {
                            onChange(val);
                            setValue("result_level_2", val.id);
                          }}
                        />
                      )}
                    />
                    {errors.result_level_2 && <p className="text-red-500">{errors.result_level_2.message}</p>}
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