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
import { FORM_EXAM, SEMESTER, TYPE_EXAM } from '../../constants';
import { useCreateExam, useExamDetail, useExamList, useUpdateExam } from '../../hooks/exam';
import { useCreateRoom, useRoomDetail, useUpdateRoom } from '../../hooks/room';

function AddRoom() {
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('id');
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
           text-white hover:text-slate-800 hover:bg-white hover:border-slate-800'>{currentLocation.pathname == '/edit-room' ? 'Cập Nhật Phòng Thi' : 'Thêm Phòng Thi'}</span></div>
          {currentLocation.pathname == '/edit-room' ? <FormEdit roomId={roomId} /> : <FormCreate />}
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
    data: dataCreate } = useCreateRoom();
  const { data: { data: exams = [], total } = {}, isLoading: isLoadingExam } = useExamList();
  exams?.map(exam => {
    exam.label = exam.name
    exam.value = exam.id

    return exam;
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
      navigate('/ListExam');
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
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên phòng thi</label>
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
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã phòng thi</label>
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
            <label htmlFor="exam_id" className="block text-sm font-medium leading-6 text-gray-900">Đề thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="exam_id"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={exams}
                    id="exam_id"
                    placeholder="Lựa chọn"
                    {...register('exam_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("exam_id", val.id);
                    }}
                  />
                )}
              />

              {errors.exam_id && <p className="text-red-500">{errors.exam_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_student" className="block text-sm font-medium leading-6 text-gray-900">Số sinh viên</label>
            <div className="mt-2">
            <input
                type="number"
                name="num_student"
                id="num_student"
                autoComplete="num_student"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_student', { required: true })}
              />
              {errors.num_student && <p className="text-red-500">{errors.num_student.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="semester_id" className="block text-sm font-medium leading-6 text-gray-900">Kì học</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="semester_id"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={SEMESTER}
                    name="semester_id"
                    id="semester_id"
                    placeholder="Lựa chọn"
                    {...register('semester_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("semester_id", val.value);
                    }}
                  />
                )}
              />
              {errors.semester && <p className="text-red-500">{errors.semester.message}</p>}
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

const FormEdit = ({ roomId }) => {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useUpdateRoom(roomId);
  const { data: { data: exams = [], total } = {}, isLoading: isLoadingExam } = useExamList();
  exams?.map(exam => {
    exam.label = exam.name
    exam.value = exam.id

    return exam;
  })
  const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
  const { data: room = {} } = useRoomDetail(roomId);
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
      navigate('/ListRoom');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (room) {
      reset({
        ...room,
        examSelected: exams?.find((exam) => exam.id === room.exam_id),
        // formSelected: FORM_EXAM?.find((form) => form.value === room.form_exam),
        // typeSelected: TYPE_EXAM?.find((type) => type.value === room.type),
        semesterSelected: SEMESTER?.find((semester) => semester.value == room.semester_id),
      })
    }
  }, [room]);
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
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên phòng thi</label>
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
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã phòng thi</label>
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
            <label htmlFor="exam_id" className="block text-sm font-medium leading-6 text-gray-900">Đề thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="examSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={exams}
                    id="exam_id"
                    value={value}
                    placeholder="Lựa chọn"
                    {...register('exam_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("exam_id", val.id);
                    }}
                  />
                )}
              />

              {errors.exam_id && <p className="text-red-500">{errors.exam_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_student" className="block text-sm font-medium leading-6 text-gray-900">Số sinh viên</label>
            <div className="mt-2">
            <input
                type="number"
                name="num_student"
                id="num_student"
                autoComplete="num_student"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_student', { required: true })}
              />
              {errors.num_student && <p className="text-red-500">{errors.num_student.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="semester_id" className="block text-sm font-medium leading-6 text-gray-900">Kì học</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="semesterSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={SEMESTER}
                    value={value}
                    id="semester_id"
                    placeholder="Lựa chọn"
                    {...register('semester_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("semester_id", val.value);
                    }}
                  />
                )}
              />
              {errors.semester && <p className="text-red-500">{errors.semester.message}</p>}
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

export default AddRoom;