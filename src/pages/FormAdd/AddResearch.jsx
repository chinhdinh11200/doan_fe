import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useCreateTopic, useTopicDetail, useTopicList, useUpdateTopic } from '../../hooks/topic';
import { useDepartmentList } from '../../hooks/departments';
import Select from 'react-select';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useStaffList } from '../../hooks/staffs';
import { POSITION_STAFF, SEMESTER, YEAR_ID } from '../../constants';
const role = [
  {
    label: "Chủ trì",
    value: 0
  },
  {
    label: "Thư kí",
    value: 1
  },
  {
    label: "Thành viên",
    value: 2
  },
];
const result = [
  {
    label: "Đạt",
    value: 0
  },
  {
    label: "Giỏi",
    value: 1
  },
  {
    label: "Xuất sắc",
    value: 2
  },
];
const level = [
  {
    label: "Cơ sở",
    value: 0
  },
  {
    label: "Ban",
    value: 1
  },
  {
    label: "Nhà nước",
    value: 2
  },
];
function AddTopic() {
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get('id');
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
           text-white hover:text-slate-800 hover:bg-white hover:border-slate-800'>{currentLocation.pathname == '/edit-topic' ? 'Cập Nhật Đề Tài' : 'Thêm Đề Tài'}</span></div>
          {currentLocation.pathname == '/edit-topic' ? <FormEdit topicId={topicId} /> : <FormCreate />}
        </main>
      </div>
    </div>
  );
}
function FormCreate() {

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useCreateTopic();
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
    name: yup.string().trim().required('Vui lòng nhập tên đề tài/dự án'),
    code: yup.string().required('Vui lòng nhập mã đề tài/dự án').min(4, "Mã đề tài/dự án không được nhỏ hơn 4 kí tự."),
    endDate: yup.date(),
    startDate: yup.date(),
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
      startDate: '',
      acceptDate: '',
      role: '',
      type: 1,
    }
  })

  useEffect(() => {
    if (dataCreate) {
      navigate('/list-research');
    }
  }, [isSuccess]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-topic'
          onSubmit={handleSubmit((values) => {
            mutate(values)
            console.log(values)
          })}
        >
          <div className="col-span-full mb-2.5">
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã đề tài/dự án</label>
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
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên đề tài/dự án</label>
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
                name="levelSelect"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={level}
                    name="level"
                    id="level"
                    placeholder="Lựa chọn"
                    {...register('level')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("level", val.value);
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
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Thành viên</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="role"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    name="role"
                    isMulti
                    id="role"
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
          <div className="col-span-full mb-2.5">
            <label htmlFor="result" className="block text-sm font-medium leading-6 text-gray-900">Kết quả</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="resultSelect"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={result}
                    name="result"
                    id="result"
                    placeholder="Lựa chọn"
                    {...register('result')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("result", val.value);
                    }}
                  />
                )}
              />
              {errors.result && <p className="text-red-500">{errors.result.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="year_id" className="block text-sm font-medium leading-6 text-gray-900">Năm học</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="year_id"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={years}
                    id="year_id"
                    placeholder="Lựa chọn"
                    {...register('year_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("year_id", val.value);
                    }}
                  />
                )}
              />
              {errors.year_id && <p className="text-red-500">{errors.year_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="semester" className="block text-sm font-medium leading-6 text-gray-900">Kỳ học</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="semester"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={SEMESTER}
                    id="semester"
                    placeholder="Lựa chọn"
                    {...register('semester')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("semester", val.value);
                    }}
                  />
                )}
              />
              {errors.semester && <p className="text-red-500">{errors.semester.message}</p>}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button onClick={() => navigate(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormEdit({ topicId }) {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useUpdateTopic(topicId);

  const { data: dataTopic } = useTopicDetail(topicId);
  const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
  staffs?.map(staff => {
    staff.label = staff.name
    staff.value = staff.id

    return staff;
  });

  dataTopic?.users?.map(user => {
    user.label = user.name
    user.value = user.id

    return user;
  });


  const { data: { data: departments = [], total } = {}, isLoading: isLoadingDepartment } = useDepartmentList();
  departments?.map(department => {
    department.label = department.name
    department.value = department.id

    return department;
  });

  const schema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập tên đề tài/dự án'),
    code: yup.string().required('Vui lòng nhập mã đề tài/dự án').min(4, "Mã đề tài/dự án không được nhỏ hơn 4 kí tự."),
    endDate: yup.date(),
    startDate: yup.date(),
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
    setValue,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  })

  useEffect(() => {
    if (dataCreate?.data.success) {
      navigate('/list-research');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (dataTopic) {
      reset({
        ...dataTopic,
        password: '',
        departmentSelected: departments?.find(department => department.id === dataTopic.department_id),
        positionSelected: POSITION_STAFF.find(position => position.value == dataTopic.position),
        level_selected: level.find(topic => topic.value == dataTopic.level),
        resultSelected: result.find(research => research.value == dataTopic.result),
        roleSelected: dataTopic?.users,
        role: dataTopic?.users?.map(user => user.id).join(','),
        type: 1
      })
    }
  }, [dataTopic]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-topic'
          onSubmit={handleSubmit((values) => {
            mutate(values)
            // console.log(values)
          })}
        >
          <div className="col-span-full mb-2.5">
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã đề tài/dự án</label>
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
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên đề tài/dự án</label>
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
            <label htmlFor="level_selected" className="block text-sm font-medium leading-6 text-gray-900">Cấp đề tài</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="level_selected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={level}
                    value={value}
                    name="level"
                    id="level"
                    placeholder="Lựa chọn"
                    {...register('level')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("level", val.value);
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
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Thành viên</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="roleSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    name="role"
                    isMulti
                    id="role"
                    value={value}
                    placeholder="Lựa chọn"
                    {...register('role')}
                    onChange={(val) => {
                      onChange();
                      let rol = val.map(item => item.value).join(',')
                      setValue('role', rol)
                    }}
                  />
                )}
              />
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="resultSelected" className="block text-sm font-medium leading-6 text-gray-900">Kết quả</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="resultSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={result}
                    value={value}
                    name="result"
                    id="result"
                    placeholder="Lựa chọn"
                    {...register('result')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("result", val.value);
                    }}
                  />
                )}
              />
              {errors.result && <p className="text-red-500">{errors.result.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="year_id" className="block text-sm font-medium leading-6 text-gray-900">Năm học</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="yearSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={years}
                    value={value}
                    id="year_id"
                    placeholder="Lựa chọn"
                    {...register('year_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("year_id", val.value);
                    }}
                  />
                )}
              />
              {errors.year_id && <p className="text-red-500">{errors.year_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="semester" className="block text-sm font-medium leading-6 text-gray-900">Kỳ học</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="semesterSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={SEMESTER}
                    id="semester"
                    placeholder="Lựa chọn"
                    value={value}
                    {...register('semester')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("semester", val.value);
                    }}
                  />
                )}
              />
              {errors.semester && <p className="text-red-500">{errors.semester.message}</p>}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button onClick={() => navigate(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTopic;