import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useClassDelete, useClassDetail, useCreateClass, useUpdateClass } from '../../hooks/class';
import Select from 'react-select';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSubjectAll, useSubjectList } from '../../hooks/subject';
import { useStaffList } from '../../hooks/staffs';
import { useCreateRoom, useRoomDetail, useUpdateRoom } from '../../hooks/room';
import { FORM_EXAM, FORM_MARK } from '../../constants';
import { useCreateMark, useMarkDetail, useUpdateMark } from '../../hooks/mark';
import { useExamDetail } from '../../hooks/exam';

function AddMark() {
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const markId = searchParams.get('id');
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
           text-white hover:text-slate-800 hover:bg-white hover:border-slate-800'>{currentLocation.pathname == '/edit-mark' ? 'Cập Nhật Chấm Thi' : 'Thêm Chấm Thi'}</span></div>
          {currentLocation.pathname == '/edit-mark' ? <FormEdit markId={markId} /> : <FormCreate />}
        </main>
      </div>
    </div>
  );
}

const FormCreate = () => {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useCreateMark();
  const { data: { data: subjects = [], total } = {}, isLoading: isLoadingsubject } = useSubjectAll();
  subjects?.map(subject => {
    subject.label = subject.name
    subject.value = subject.id

    return subject;
  })
  const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
  staffs?.map(staff => {
    staff.label = staff.name
    staff.value = staff.id

    return staff;
  })

  const schema = yup.object().shape({
    name: yup.string().trim().required('Tên nhân viên là bắt buộc').max(191, 'Tên không dài quá 191 kí tự'),
    code: yup.string().required('Mã nhân viên là bắt buộc.').min(4, "Mã nhân viên không được nhỏ hơn 4 kí tự."),
    position: yup.string(),
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
    }
  })

  useEffect(() => {
    if (dataCreate) {
      navigate('/list-mark');
    }
  }, [isSuccess]);
  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-class'
          onSubmit={handleSubmit((values) => {
            mutate(values)
            console.log(values)
          })}
        >
          <div className="col-span-full mb-2">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên chấm thi</label>
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
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã chấm thi</label>
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
            <label htmlFor="subject_id" className="block text-sm font-medium leading-6 text-gray-900">Môn thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="subject_id"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={subjects}
                    id="subject_id"
                    placeholder="Lựa chọn"
                    {...register('subject_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("subject_id", val.id);
                    }}
                  />
                )}
              />
              {errors.subject_id && <p className="text-red-500">{errors.subject_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="user_id" className="block text-sm font-medium leading-6 text-gray-900">Người chấm thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="user_id"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    id="user_id"
                    placeholder="Lựa chọn"
                    {...register('user_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("user_id", val.id);
                    }}
                  />
                )}
              />
              {errors.user_id && <p className="text-red-500">{errors.user_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">Hình thức chấm thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="type"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={FORM_MARK}
                    id="type"
                    placeholder="Lựa chọn"
                    {...register('type')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("type", val.value);
                    }}
                  />
                )}
              />
              {errors.type && <p className="text-red-500">{errors.type.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_exam" className="block text-sm font-medium leading-6 text-gray-900">Số bài chấm thi</label>
            <div className="mt-2">
              <input
                type="number"
                name="num_exam"
                id="num_exam"
                autoComplete="num_exam"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_exam', { required: true })}
              />
              {errors.num_exam && <p className="text-red-500">{errors.num_exam.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="date_exam" className="block text-sm font-medium leading-6 text-gray-900">Ngày chấm thi</label>
            <div className="mt-2">
              <input
                type="date"
                name="date_exam"
                id="date_exam"
                autoComplete="date_exam"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('date_exam', { required: true })}
              />
              {errors.date_exam && <p className="text-red-500">{errors.date_exam.message}</p>}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const FormEdit = ({ markId }) => {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useUpdateMark(markId);
  const { data: { data: subjects = [], total } = {}, isLoading: isLoadingSubject } = useSubjectAll();
  subjects?.map(subject => {
    subject.label = subject.name
    subject.value = subject.id

    return subject;
  })
  const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
  const { data: mark = {} } = useMarkDetail(markId);
  staffs?.map(staff => {
    staff.label = staff.name
    staff.value = staff.id

    return staff;
  })

  const schema = yup.object().shape({})

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
    defaultValues: {
    }
  })

  useEffect(() => {
    if (dataCreate) {
      navigate('/list-mark');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (mark) {
      console.log( staffs?.find((user) => user.id === mark.user_id));
      reset({
        ...mark,
        subjectSelected: subjects?.find((subject) => subject.id === mark.subject_id),
        userSelected: staffs?.find((user) => user.id === mark.user_id),
        formMarkSelected: FORM_MARK?.find((formMark) => formMark.value == mark.type),
      })
    }
  }, [mark]);
  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-class'
          onSubmit={handleSubmit((values) => {
            mutate(values)
            console.log(values)
          })}
        >
          {/* <div className="col-span-full mb-2">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên chấm thi</label>
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
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã chấm thi</label>
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
          </div> */}
          <div className="col-span-full mb-2">
            <label htmlFor="subject_id" className="block text-sm font-medium leading-6 text-gray-900">Môn thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="subjectSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={subjects}
                    id="subject_id"
                    value={value}
                    placeholder="Lựa chọn"
                    {...register('subject_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("subject_id", val.id);
                    }}
                  />
                )}
              />

              {errors.subject_id && <p className="text-red-500">{errors.subject_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="user_id" className="block text-sm font-medium leading-6 text-gray-900">Người chấm thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="userSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    id="user_id"
                    value={value}
                    placeholder="Lựa chọn"
                    {...register('user_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("user_id", val.id);
                    }}
                  />
                )}
              />

              {errors.user_id && <p className="text-red-500">{errors.user_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="user_id" className="block text-sm font-medium leading-6 text-gray-900">Hình thức chấm thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="formMarkSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={FORM_MARK}
                    id="type"
                    value={value}
                    placeholder="Lựa chọn"
                    {...register('type')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("type", val.value);
                    }}
                  />
                )}
              />

              {errors.type && <p className="text-red-500">{errors.type.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_exam" className="block text-sm font-medium leading-6 text-gray-900">Số bài chấm thi</label>
            <div className="mt-2">
              <input
                type="number"
                name="num_exam"
                id="num_exam"
                autoComplete="num_exam"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_exam', { required: true })}
              />
              {errors.num_exam && <p className="text-red-500">{errors.num_exam.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="date_exam" className="block text-sm font-medium leading-6 text-gray-900">Ngày chấm thi</label>
            <div className="mt-2">
              <input
                type="date"
                name="date_exam"
                id="date_exam"
                autoComplete="date_exam"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('date_exam', { required: true })}
              />
              {errors.date_exam && <p className="text-red-500">{errors.date_exam.message}</p>}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMark;