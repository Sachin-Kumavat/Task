import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../css/ViewEmployee.css";

const ViewEmployee = ({ employee }) => {
  // const { employeeId } = useParams(); 
  // const [employee, setEmployee] = useState(null);
  
  const navigate = useNavigate();

  // const mount  = useRef(true);

  // function dummy(){
  //   console.log("dummy function")
  //   return "dummy function";
  // } 





  /*
  // let a=7;
  // useEffect(()=>{
  //   dummy();
  // },[])
  const [data, setData] = useState("");
  // let b=6;
  const getData = async () => {
    try {
      const resp = await fetch('https://api.sampleapis.com/coffee/hot');
      const json = await resp.json();
      setData(json);
      console.log(data);

    } catch (err) {
      setData(err.message);
    }

    // fetch('https://api.sampleapis.com/coffee/hot')
    // .then(res=> res.json)
    // .then(setData(json))
    // .catch((e)=>{setData(err.message);})
  } 



  useEffect(() => {
    mount.current = true;
    getData();
    console.log('didmount')
    return ()=>{
      if(mount.current){
        console.log('unmonted component')
      }
      mount.current = false;
    }
  },[]);
  */





  // useEffect(() => {

  //   // const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
  //   // const foundEmployee = storedEmployees.find(
  //   //   (emp) => emp.employeeId === employeeId
  //   // );
  //   // setEmployee(foundEmployee); 
  //   // (function(){
  //   //   return true;
  //   // })()

  //   const storedEmployee = JSON.parse(localStorage.getItem("selectedEmployee"));
  //   setEmployee(storedEmployee);
  // }, [employeeId]);

  const storedEmployee = JSON.parse(localStorage.getItem("selectedEmployee"));

  if (!employee && !storedEmployee) {
    return (
      <div className="view-page">
        <p className="error-message" style={{fontSize: "30px"}}>Employee not found!</p>
        <button onClick={() =>
          {localStorage.removeItem("selectedEmployee");
          navigate(`/`);}} className="back-btn">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="view-page">
      <div className="employee-card">
        <h2 className="card-title">Employee Details</h2>
        <div className="card-content">
          <p><strong>Employee ID:</strong> {employee?.employeeId}</p>
          <p><strong>Name:</strong> {employee?.name}</p>
          <p><strong>Age:</strong> {employee?.age}</p>
          <p><strong>Mobile:</strong> {employee?.mobile}</p>
          <p><strong>Email:</strong> {employee?.email}</p>
          <p><strong>Department:</strong> {employee?.department}</p>
          <p><strong>Task:</strong> {employee?.task}</p>
          <p><strong>Task Status:</strong> {employee?.taskStatus}</p>
          <p><strong>Start Date:</strong> {employee?.startDate}</p>
          <p><strong>End Date:</strong> {employee?.endDate}</p>
        </div>
        <button onClick={() =>{localStorage.removeItem("selectedEmployee"); navigate("/");}} className="back-btn">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewEmployee;