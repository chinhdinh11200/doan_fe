import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import EditMenu from '../partials/EditMenu';


function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="flex justify-between items-center mb-4">
               
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                 {/* Filter button */}
                 <FilterButton />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
             {/* Card (Recent Activity) */}
             <DashboardCard12 />
              {/* Card (Customers) */}
              <DashboardCard10 />
               {/* Table (Top Channels) */}
               <DashboardCard10 />
               {/* Table (Top Channels) */}
               <DashboardCard07 />
              
              
            </div>

          </div>
        </main>

        <EditMenu />

      </div>
    </div>
  );
}

export default Dashboard;