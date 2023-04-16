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
import { useCreateExam, useExamDetail, useUpdateExam } from '../../hooks/exam';

function AddExam() {
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const examId = searchParams.get('id');
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
           text-white hover:text-slate-800 hover:bg-white hover:border-slate-800'>{currentLocation.pathname == '/edit-exam' ? 'Cập Nhật Đề Thi' : 'Thêm Đề Thi'}</span></div>
          {currentLocation.pathname == '/edit-exam' ? <FormEdit examId={examId} /> : <FormCreate />}
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
    data: dataCreate } = useCreateExam();
  const { data: { data: subjects = [], total } = {}, isLoading: isLoadingSubject } = useSubjectAll();
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
          <div className="col-span-full">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên đề thi</label>
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
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã đề thi</label>
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
          <div className="col-span-full">
            <label htmlFor="user_id" className="block text-sm font-medium leading-6 text-gray-900">Người ra đề</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="user_id"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    name="user_id"
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
          <div className="col-span-full">
            <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">Loai đề thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="type"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={TYPE_EXAM}
                    name="type"
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
          <div className="col-span-full">
            <label htmlFor="form_exam" className="block text-sm font-medium leading-6 text-gray-900">Hình thức thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="form_exam"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={FORM_EXAM}
                    name="form_exam"
                    id="form_exam"
                    placeholder="Lựa chọn"
                    {...register('form_exam')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("form_exam", val.value);
                    }}
                  />
                )}
              />
              {errors.form_exam && <p className="text-red-500">{errors.form_exam.message}</p>}
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="number_question" className="block text-sm font-medium leading-6 text-gray-900">Số câu hỏi</label>
            <div className="mt-2">
              <input
                type="number"
                name="number_question"
                id="number_question"
                autoComplete="number_question"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('number_question', { required: true })}
              />
              {errors.number_question && <p className="text-red-500">{errors.number_question.message}</p>}
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="num_code" className="block text-sm font-medium leading-6 text-gray-900">Số mã đề</label>
            <div className="mt-2">
              <input
                type="number"
                name="num_code"
                id="num_code"
                autoComplete="num_code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_code', { required: true })}
              />
              {errors.num_code && <p className="text-red-500">{errors.num_code.message}</p>}
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="time_work" className="block text-sm font-medium leading-6 text-gray-900">Thời gian làm bài</label>
            <div className="mt-2">
              <input
                type="number"
                name="time_work"
                id="time_work"
                autoComplete="time_work"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('time_work', { required: true })}
              />
              {errors.time_work && <p className="text-red-500">{errors.time_work.message}</p>}
            </div>
          </div>
          <div className="col-span-full">
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

const FormEdit = ({ examId }) => {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useUpdateExam(examId);
  const { data: { data: subjects = [], total } = {}, isLoading: isLoadingSubject } = useSubjectAll();
  subjects?.map(subject => {
    subject.label = subject.name
    subject.value = subject.id

    return subject;
  })
  const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
  const { data: exam = {} } = useExamDetail(examId);
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
      navigate('/ListClass');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (exam) {
      reset({
        ...exam,
        subjectSelected: subjects?.find((subject) => subject.id === exam.subject_id),
        userSelected: staffs?.find((staff) => staff.id === exam.user_id),
        formSelected: FORM_EXAM?.find((form) => form.value === exam.form_exam),
        typeSelected: TYPE_EXAM?.find((type) => type.value === exam.type),
        semesterSelected: SEMESTER?.find((semester) => semester.value === exam.semester_id),
      })
    }
  }, [exam]);
  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-class'
          onSubmit={handleSubmit((values) => {
            console.log(values)
            mutate(values)
          })}
        >
          <div className="col-span-full">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên đề thi</label>
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
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã đề thi</label>
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
          <div className="col-span-full">
            <label htmlFor="user_id" className="block text-sm font-medium leading-6 text-gray-900">Người ra đề</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="userSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    value={value}
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
          <div className="col-span-full">
            <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">Loai đề thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="typeSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={TYPE_EXAM}
                    value={value}
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
          <div className="col-span-full">
            <label htmlFor="form_exam" className="block text-sm font-medium leading-6 text-gray-900">Hình thức thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="formSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={FORM_EXAM}
                    value={value}
                    id="form_exam"
                    placeholder="Lựa chọn"
                    {...register('form_exam')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("form_exam", val.value);
                    }}
                  />
                )}
              />
              {errors.form_exam && <p className="text-red-500">{errors.form_exam.message}</p>}
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="number_question" className="block text-sm font-medium leading-6 text-gray-900">Số câu hỏi</label>
            <div className="mt-2">
              <input
                type="number"
                name="number_question"
                id="number_question"
                autoComplete="number_question"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('number_question', { required: true })}
              />
              {errors.number_question && <p className="text-red-500">{errors.number_question.message}</p>}
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="num_code" className="block text-sm font-medium leading-6 text-gray-900">Số mã đề</label>
            <div className="mt-2">
              <input
                type="number"
                name="num_code"
                id="num_code"
                autoComplete="num_code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_code', { required: true })}
              />
              {errors.num_code && <p className="text-red-500">{errors.num_code.message}</p>}
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="time_work" className="block text-sm font-medium leading-6 text-gray-900">Thời gian làm bài</label>
            <div className="mt-2">
              <input
                type="number"
                name="time_work"
                id="time_work"
                autoComplete="time_work"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('time_work', { required: true })}
              />
              {errors.time_work && <p className="text-red-500">{errors.time_work.message}</p>}
            </div>
          </div>
          <div className="col-span-full">
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

export default AddExam;