import React from 'react';

function DashboardCard07() {
  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Danh sách nghiên cứu khoa học gần đây</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Mã Dự án</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Tên đề tài</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Số Người Tham gia</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Ngày Nghiệm Thu</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Kết quả đạt được</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">123</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">ABC</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">2</div>
                </td>
                <td className="p-2">
                  <div className="text-center">03/10/2023</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">Chưa nghiệm thu</div>
                </td>
              </tr>
              {/* Row */}
             
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                  
                    <div className="text-slate-800">34458</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">Google</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">3</div>
                </td>
                <td className="p-2">
                  <div className="text-center">224</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">Xuất Sắc</div>
                </td>
              </tr>
              {/* Row */}
             
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">12563</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">Twitter</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">2</div>
                </td>
                <td className="p-2">
                  <div className="text-center">03/01/2022</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">Đạt</div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
