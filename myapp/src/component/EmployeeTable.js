import React, { useEffect, useState } from 'react';
import "../css/EmployeeTable.css";
import { useNavigate } from 'react-router-dom';

const EmployeeTable = ({ setSelectedEmployee }) => {
    const [employees, setEmployees] = useState({});
    const [searchText, setSearchText] = useState("");
    const [isFiltered, setIsFiltered] = useState(false);
    const [originalEmployees, setOriginalEmployees] = useState([]);

    const navigate = useNavigate();


    // const [employeeMap, setEmployeeMap] = useState(new Map());




    // const handleView = (employeeId) => {
    //     const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    //     const foundEmployee = storedEmployees.find(
    //         (employee) => employee.employeeId === employeeId
    //     );

    //     localStorage.setItem("selectedEmployee", JSON.stringify(foundEmployee));

    //     navigate(`/profile/${employeeId}`);
    // };



    const handleView = (employeeId) => {
        const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
        const foundEmployee = storedEmployees.find(
            (employee) => employee.employeeId === employeeId
        );

        setSelectedEmployee(foundEmployee);
        localStorage.setItem("selectedEmployee", JSON.stringify(foundEmployee))
        // setprofile(true);

        navigate(`/profile`);
    };



    /*const handleView = (employeeId) => {
        const selectedEmployee = employeeMap.get(employeeId);
        console.log(selectedEmployee);
        
        localStorage.setItem("selectedEmployee", JSON.stringify(selectedEmployee));
        setprofile(true);

        navigate(`/profile/${employeeId}`);
    };*/




    const handleUpdate = (employeeId) => {
        const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
        const foundEmployee = storedEmployees.find(
            (employee) => employee.employeeId === employeeId
        );
        //   console.log(foundEmployee.employeeId)
        //   console.log(employees.mobile);

        navigate(`/update/${foundEmployee?.employeeId}`);
    };




    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
        setEmployees(storedEmployees);
        setOriginalEmployees(storedEmployees);
    }, []);





    // useEffect(() => {
    //     const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    //     const employeeDataMap = new Map(storedEmployees.map(emp => [emp.employeeId, emp]));
    //     console.log(employeeDataMap)
    //     setEmployeeMap(employeeDataMap);
    // }, []);




    const handleFilter = () => {
        if (isFiltered) {
            setEmployees(originalEmployees);
            setSearchText("");
            setIsFiltered(false);
        } else {
            const filteredEmployees = originalEmployees.filter((employee) =>
                employee.employeeId.toString().includes(searchText)
            );
            setEmployees(filteredEmployees);
            setIsFiltered(true);
        }
    }













    const handleDelete = (employeeId) => {
        const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
        const updatedEmployees = storedEmployees.filter((employee) => employee.employeeId !== employeeId);

        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        setEmployees(updatedEmployees);
        setOriginalEmployees(updatedEmployees);
    };

    // function view() {
    //     console.log("View button clicked")
    // }



    return (
        <>
            <div className="employee-table-page">
                {employees.length>0? (<div className="table-header">
                    <h1 className="table-title">Employee List</h1>
                    {/* <button className="add-employee" onClick={() => navigate('/employees')} >Add Employee</button> */}
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by Id"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button
                            className="filter-btn"
                            onClick={handleFilter}>
                            {isFiltered ? "Unfilter" : "Search"}
                        </button>
                    </div>
                </div>): ""}
                <div className="table-container">
                    {employees.length > 0 ? (
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Task</th>
                                    <th>Task Status</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee, index) => (
                                    <tr key={index}>
                                        <td>{employee?.employeeId}</td>
                                        <td>{employee?.name}</td>
                                        <td>{employee?.age}</td>
                                        <td>{employee?.mobile}</td>
                                        <td>{employee?.email}</td>
                                        <td>{employee?.department}</td>
                                        <td>{employee?.task}</td>
                                        <td>{employee?.taskStatus}</td>
                                        <td>{employee?.startDate}</td>
                                        <td>{employee?.endDate}</td>
                                        <td>
                                            <button className="action-btn view-btn" onClick={() => handleView(employee.employeeId)}>View</button>
                                            <button className="action-btn update-btn" onClick={() => { handleUpdate(employee.employeeId) }} >Update</button>
                                            <button className="action-btn delete-btn" onClick={() => handleDelete(employee.employeeId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="no-data-message">No employees found</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default EmployeeTable;