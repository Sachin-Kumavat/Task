import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Navbar from "./component/Navbar";
import FormPage from "./component/FormPage";
import EmployeeTable from "./component/EmployeeTable";
import ViewEmployee from "./component/ViewEmployee";
import UpdateEmployee from "./component/UpdateEmployee";
import Notfound from "./component/notfound";

function App(){
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  // const [profile, setprofile] = useState(false);
  useEffect(()=>{
    const storedEmployee = localStorage.getItem("selectedEmployee");
    if(storedEmployee){
      setSelectedEmployee(JSON.parse(storedEmployee))
    }
  },[])
  return (
    <Router>
      <Navbar />
      <Toaster/>
      <Routes>
        <Route path="/" element={<EmployeeTable setSelectedEmployee={setSelectedEmployee} />} />
        <Route path="/employees" element={<FormPage />} />
        <Route path="/profile" element={<ViewEmployee employee={selectedEmployee} />} /> 
        {/* // <Route path="/profile" element={<ViewEmployee employee={selectedEmployee} />} /> */}
        <Route path="/update/:employeeId" element={<UpdateEmployee />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
};

export default App;