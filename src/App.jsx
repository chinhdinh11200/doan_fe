import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import ForgotPassPage from './pages/ForgotPass';
import StaffList from './pages/StaffList';
import AllTeaching from './pages/teachingList';
import CourseList from './pages/CourseList';
import ThesisList from './pages/ThesisList';
import ResearchList from './pages/ResearchList';
import ScientificArticles from './pages/ScientificArticles';
import LicenseInvention from './pages/LicenseInvention';
import TextBook from './pages/TextBook';
import IntructionList from './pages/IntructionList';
import BuildProgramList from './pages/BuildProgramList';
import AddThesis from './pages/FormAdd/AddThesis.jsx';
import EditAccount from './pages/EditAccount';
import AddStaff from './pages/FormAdd/Addstaff';
import AddTeaching from './pages/FormAdd/AddTeaching';
import AddTermExam from './pages/FormAdd/AddTermExam';
import AddResearch from './pages/FormAdd/AddResearch';
import AddMaterialCompilation from './pages/FormAdd/AddMaterialCompilation';
import AddTextBook from './pages/FormAdd/AddTextBook';
import AddInstruction from './pages/FormAdd/AddInstruction';
import AddLicense from './pages/FormAdd/AddLicense';
import AddScientificArticles from './pages/FormAdd/AddScientificArticles';
import AddBuildProgram from './pages/FormAdd/AddBuildProgram';

import FormAddMaterialCompilation from './pages/ListMaterialCompilation'
const Test = () =>{
  return  <div>test</div>;
}

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route exact path="/" element={<LoginPage/>} />
        <Route path="/forgotpassword" element={<ForgotPassPage/>} />
        <Route path="/ListStaff" element={<StaffList/>} />
        <Route path="/AllTeaching" element={<AllTeaching/>} />
        <Route path="/CourseList" element={<CourseList/>} />
        <Route path="/ThesisList" element={<ThesisList/>} />
        <Route path="/ResearchList" element={<ResearchList/>} />
        <Route path="/ScientificArticles" element={<ScientificArticles/>} />
        <Route path="/TextBook" element={<TextBook/>} />
        <Route path="/LicenseInvention" element={<LicenseInvention/>} />
        <Route path="/intruction-list" element={<IntructionList/>} />
        <Route path="/add-material-compilation" element={<AddMaterialCompilation/>} />
        <Route path="/build-program-list" element={<BuildProgramList/>} />
        <Route path="/personal-infor" element={<EditAccount/>} />
        <Route path="/ecommerce/customers" element={<Test />}/>
        <Route path="/material-compilation-list" element={<FormAddMaterialCompilation />}/>
        <Route path="/addstaff" element={<AddStaff/>}/>
        <Route path="/addteaching" element={<AddTeaching/>}/>
        <Route path="/add-term-exam" element={<AddTermExam/>}/>
        <Route path="/add-research" element={<AddResearch/>}/>
        <Route path="/add-scientific-articles" element={<AddScientificArticles/>}/>
        <Route path="/add-thesis" element={<AddThesis/>}/>
        <Route path="/add-textbook" element={<AddTextBook/>}/>
        <Route path="/add-instructions" element={<AddInstruction/>}/>
        <Route path="/add-prizeList" element={<AddLicense/>}/>
        <Route path="/add-build-program" element={<AddBuildProgram/>}/>
      </Routes>
    </>
  );
}

export default App;
