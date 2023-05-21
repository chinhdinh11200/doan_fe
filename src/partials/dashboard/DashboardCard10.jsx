import React, { useContext } from 'react';
import { LEVEL_TOPIC, RESULT_TOPIC } from '../../constants';
import { Table } from 'antd';
import { useTopicList } from '../../hooks/topic';
import { UserContext } from '../../context/userInfo';

const columns = [
  {
    title: <div className="text-center">STT</div>,
    dataIndex: "index",
    key: "index",
    width: "1%",
    render: (text, t, index) => (
      <p className="text-center">
        {index + 1}
      </p>
    ),
  },
  {
    title: <div className="text-center">Mã dự án</div>,
    dataIndex: "code",
    key: "code",
    render: (_, record) => <> {record.code}</>,
    sortDirections: ["descend", "ascend", "descend"],
    sorter: () => { },
  },
  {
    title: <div className="text-center">Tên đề tài/dự án</div>,
    dataIndex: "name",
    key: "name",
    sortDirections: ["descend", "ascend", "descend"],
    sorter: () => { },
  },
  {
    title: <div className="text-center">Số người tham gia</div>,
    dataIndex: "num_person",
    key: "num_person",
    sortDirections: ["descend", "ascend", "descend"],
    sorter: () => { },
  },
  {
    title: <div className="text-center">Cấp</div>,
    dataIndex: "level",
    key: "level",
    sortDirections: ["descend", "ascend", "descend"],
    sorter: () => { },
    render: (_, record) => <p> {
      LEVEL_TOPIC.find(level => level.value == record.level).label
    }</p>,
  },
  {
    title: <div className="text-center">Kết quả đạt được</div>,
    dataIndex: "result",
    key: "result",
    sortDirections: ["descend", "ascend", "descend"],
    sorter: () => { },
    render: (_, record) => <p> {
      RESULT_TOPIC.find(result => result.value == record.result).label
    }</p>,
  },
  // {
  //   title: <div className="text-center">Hành động</div>,
  //   key: "action",
  //   width: "150px",
  //   render: (_, record) => {
  //     return (
  //       <Space size="middle" className="flex justify-center">
  //         <NavLink
  //           end
  //           to={`/edit-topic?id=${record.id}`}
  //           className={({ isActive }) =>
  //             'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
  //           }
  //         >
  //           <Tooltip placement="top" title='Sửa'>
  //             <a href="#" className="text-indigo-600 hover:text-indigo-900" title='edit'>
  //               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
  //                 stroke="currentColor">
  //                 <path strokeLinecap="round" strokeLinejoin="round" strokewith="2"
  //                   d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  //               </svg>
  //             </a>
  //           </Tooltip>
  //         </NavLink>
  //         <Tooltip placement="top" title='Chi tiết' onClick={() => {
  //           setShowModal(true);
  //           setTopicDetailId(record.id)
  //         }}>
  //           <a href="#" className="text-gray-600 hover:text-gray-900" title='view'>
  //             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
  //               stroke="currentColor">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokewith="2"
  //                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  //               <path strokeLinecap="round" strokeLinejoin="round" strokewith="2"
  //                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  //             </svg>
  //           </a>
  //         </Tooltip>
  //         <Tooltip placement='top' title='Xoá'>
  //           <span title='delete'><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600 hover:text-red-800"
  //             fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => showDeleteModal(record.id)}>
  //             <path strokeLinecap="round" strokeLinejoin="round" strokewith="2"
  //               d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  //           </svg></span>
  //         </Tooltip>
  //       </Space>
  //     );
  //   },
  // },
];
function DashboardCard10() {
  const { user } = useContext(UserContext);
  const { data: { data: dataTopics = [], total } = {}, isLoading } = useTopicList({
    pagination: {
      pageSize: 1,
    },
    userId: user?.id,
  });
  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Danh sách nghiên cứu khoa học gần đây</h2>
      </header>
      <div className="p-3">
        <Table
          columns={columns}
          dataSource={dataTopics}
          rowKey={(record) => record.id}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default DashboardCard10;
