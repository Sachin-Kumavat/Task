import React, { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import "../css/FormPage.css";

const FormPage = () => {
    const [formData, setFormData] = useState({
        employeeId: "",
        name: "",
        age: "",
        mobile: "",
        email: "",
        department: "",
        task: "",
        taskStatus: "Pending",
        startDate: "",
        endDate: "",
    });


    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const currDate = new Date();


    const isValidEmployeeId = (id) => {
        return /^[a-zA-Z0-9]{5,}$/.test(id);
    };

    const isValidName = (name) => {
        return /^[a-zA-Z\s]+$/.test(name);
    };

    const isValidAge = (age) => {
        return /^\d{1,2}$/.test(age) && age >= 18 && age <= 60;
    };

    const isValidDepartment = (department) => {
        return /^[a-zA-Z0-9\s]+$/.test(department);
    }

    const validateForm = () => {
        const newErrors = {};

        const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];

        const isDuplicateId = storedEmployees.map(
            (employee) => employee.employeeId === formData.employeeId
        ).includes(true);


        if (!formData.employeeId) {
            newErrors.employeeId = "Employee ID is required.";
        } else if (!isValidEmployeeId(formData.employeeId)) {
            newErrors.employeeId = "Employee ID must be alphanumeric and at least 5 characters long, no special characters.";
        } else if (isDuplicateId) {
            newErrors.employeeId = "Id already exists";
        }


        if (!formData.name) {
            newErrors.name = "Name is required.";
        } else if (!isValidName(formData.name)) {
            newErrors.name = "Name must contain only letters.";
        }

        if (!formData.age) {
            newErrors.age = "Age is required.";
        } else if (!isValidAge(formData.age)) {
            newErrors.age = "Age must be a number between 18 and 60.";
        }

        const isDuplicateMobile = storedEmployees.map(
            (employee) => employee.mobile === formData.mobile
        ).includes(true);

        if (!formData.mobile) {
            newErrors.mobile = "Mobile number is required.";
        }
        if (formData.mobile.length > 10) {
            newErrors.mobile = "Number exceed limit "
        } else if (isDuplicateMobile) {
            newErrors.mobile = "Number already exists."
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        }


        if (!formData.department) {
            newErrors.department = "Department is required.";
        }
        // else if (!isValidDepartment(formData.department)) {
        //     newErrors.department = "Department must contain only letters and spaces.";
        // }

        if (!formData.task) {
            newErrors.task = "Task is required.";
        }
        // else if (!isValidName(formData.task)) {
        //     newErrors.task = "Task must contain only letters and spaces.";
        // }

        if (!formData.startDate || !formData.endDate) {
            newErrors.dates = "Start and End dates are required.";
        } else if (new Date(formData.startDate) >= new Date(formData.endDate)) {
            newErrors.dates = "Start date must be earlier than the end date.";
        }


        // if (formData.endDate && new Date(formData.endDate) < currDate) {
        //     if (formData.taskStatus === "In-Progress" || formData.taskStatus === "Pending") {
        //         newErrors.taskStatus = "End date has passed. Task can't be 'In-Progress' or 'Pending'. It must be 'Completed' or 'Cancelled'.";
        //         setFormData((prevState) => ({
        //             ...prevState,
        //             taskStatus: "Completed", 
        //         }));
        //     }
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
            localStorage.setItem("employees", JSON.stringify([...storedEmployees, formData]));
            toast.success("Employee added successfully!");
            setFormData({
                employeeId: "",
                name: "",
                age: "",
                mobile: "",
                email: "",
                department: "",
                task: "",
                taskStatus: "Pending",
                startDate: "",
                endDate: "",
            });
            navigate("/");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === "name") && !isValidName(value)) {
            return;
        }
        if (name === "employeeId") {
            setFormData({
                ...formData,
                [name]: value,
            });

            if (!isValidEmployeeId(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    employeeId: "Employee ID must be alphanumeric and at least 5 characters long.",
                }));
            } else {
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors.employeeId; 
                    return newErrors;
                });
            }
            return; 
        }

        if (name === "age") {
            // if (!/^\d{1,2}$/.test(value) || value < 18 || value > 60) {
            //     return;
            // }

            if (/^(?!0(\d+))\d+$/.test(value) && value > 0) {
                setFormData({
                    ...formData,
                    [name]: value,
                });
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors.age;
                    return newErrors;
                });
            } else if (value === "") {
                setFormData({
                    ...formData,
                    [name]: value,
                });
            }
            return;
        }

        // if (name === "age") {
        //     if (!/^\d{1,2}$/.test(value) || value < 18 || value > 60) {
        //         return;
        //     }
        // }


        if (name === "mobile") {
            // if (!value) {
            //     setErrors((prevErrors) => ({
            //         ...prevErrors,
            //         mobile: "Mobile number is required.",
            //     }));
            //     return;
            // }

            if (value.length > 10) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    mobile: "Mobile number cannot exceed 10 digits.",
                }));
                return;
            }
    
            if (!/^(?!0\d)\d{1,10}$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    mobile: "Mobile number must start with a non-zero digit and be numeric.",
                }));
            } else {
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors.mobile;
                    return newErrors;
                });
            }
            // else if (value === "") {
            //     setFormData({
            //         ...formData,
            //         [name]: value,
            //     });
            // }
            if (/^\d*$/.test(value)) { 
                setFormData({
                    ...formData,
                    [name]: value,
                });
            }
            return;
        }




        // if (name === "department") {

        //     if (/^[a-zA-Z0-9]$/.test(value)) {
        //         setFormData({
        //             ...formData,
        //             [name]: value,
        //         });
        //         setErrors((prevErrors) => {
        //             const newErrors = { ...prevErrors };
        //             delete newErrors.age;
        //             return newErrors;
        //         });
        //     } else if (value === "") {
        //         setFormData({
        //             ...formData,
        //             [name]: value,
        //         });
        //     }
        //     return;
        // }




        if (name === "startDate" || name === "endDate") {
            setFormData({
                ...formData,
                [name]: value,
            });

            if (name === "startDate") {
                const startDate = new Date(value);

                const endDateElement = document.querySelector('input[name="endDate"]');
                if (endDateElement) {
                    const startDateString = startDate.toISOString().split('T')[0];
                    endDateElement.setAttribute("min", startDateString);
                }

                setFormData({
                    ...formData,
                    [name]: value,
                });
            } else if (name === "endDate") {
                const endDate = new Date(value);

                if (new Date(formData.startDate) >= endDate) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        dates: "End date must be later than start date.",
                    }));
                } else {
                    setErrors((prevErrors) => {
                        const newErrors = { ...prevErrors };
                        delete newErrors.dates;
                        return newErrors;
                    });
                }

                setFormData({
                    ...formData,
                    [name]: value,
                });
            }


            validateField(name, value);
            return;
        }







        setFormData({
            ...formData,
            [name]: value,
        });

        validateField(name, value);
    };



    const validateField = (name, value) => {
        const newErrors = { ...errors };

        if (name === "employeeId") {
            // if (!value) {
            //     newErrors.employeeId = "Employee ID is required.";
            // }  
            if (!isValidEmployeeId(value)) {
                newErrors.employeeId = "Employee ID must be alphanumeric and at least 5 characters long.";
            }
            else {
                delete newErrors.employeeId;
            }
        }

        if (name === "name") {
            // if (!value) {
            //     newErrors.name = "Name is required.";
            // } 
            if (!isValidName(value)) {
                newErrors.name = "Name must contain only letters.";
            } else {
                delete newErrors.name;
            }
        }

        if (name === "age") {
            // if (!value) {
            //     newErrors.age = "Age is required.";
            // } 
            if (!isValidAge(value)) {
                newErrors.age = "Age must be a number between 18 and 60.";
            } else if (value > 60) {
                newErrors.age = "Age not under limit"
            }
            else {
                delete newErrors.age;
            }
        }


        if (name === "mobile") {
            if (value.length > 10) {
                newErrors.mobile = "Mobile number exceed limit.";
            }
            // if (!value) {
            //     newErrors.mobile = "Mobile number is required.";
            // } 
            if (!/^(?!0\d)\d+$/.test(value)) {
                newErrors.mobile = "Mobile number must be numeric and not start with 0.";
            } else {
                delete newErrors.mobile;
            }
        }


        if (name === "department") {
            // if (!value) {
            //     newErrors.department = "Department is required.";
            // } 
            if (!isValidDepartment(value)) {
                newErrors.department = "Department must contain only alphanumeric values.";
            } else {
                delete newErrors.department;
            }
        }


        if (name === "task") {
            // if (!value) {
            //     newErrors.task = "Task is required.";
            // }  
            if (!isValidDepartment(value)) {
                newErrors.task = "Task must contain only letters and spaces.";
            } else {
                delete newErrors.task;
            }
        }


        // if (name === "taskStatus") {
        //     if (formData.endDate && new Date(formData.endDate) < currDate) {
        //         if (value === "In-Progress" || value === "Pending") {
        //             newErrors.taskStatus = "End date has passed. Task can't be 'In-Progress' or 'Pending'. It must be 'Completed' or 'Cancelled'.";
        //         }
        //     }
        //     delete newErrors.taskStatus;
        // }

        setErrors(newErrors);
    };



    const getTaskStatusOptions = () => {
        if (formData.startDate && new Date(formData.startDate) > currDate) {
            return ["Upcoming", "Cancelled"]
        }

        if (formData.endDate && new Date(formData.endDate) < currDate) {
            return ["Completed", "Cancelled"];
        } else {
            return ["Pending", "In-Progress", "Completed"];
        }
    };


    // function view(){
    //     console.log("view caled")
    // }

    // let formDtaaa=null
    // console.log(formDtaaa?.name)

    /*
    let data = {
        cat: {
            name: "kitty"
        },
        dog: {
            name: "Tommy"
        }
    }

    console.log(data.cow?.age)*/


    return (
        <div className="form-page">
            <div className="form-container">
                <h2 className="form-title">Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Employee ID</label>
                            <input
                                type="text"
                                name="employeeId"
                                value={formData?.employeeId}
                                // onChange={()=>{handleChange()}}
                                onChange={handleChange}
                            />
                            {errors.employeeId && <p className="error-message">{errors.employeeId}</p>}
                        </div>

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData?.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </div>

                        <div className="form-group">
                            <label>Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                            />
                            {errors.age && <p className="error-message">{errors.age}</p>}
                        </div>

                        <div className="form-group">
                            <label>Mobile</label>
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                            {errors.mobile && <p className="error-message">{errors.mobile}</p>}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>


                        <div className="form-group">
                            <label>Department</label>
                            <input
                                type="text"
                                name="department"
                                value={formData?.department}
                                onChange={handleChange}


                            />
                            {errors.department && <p className="error-message">{errors.department}</p>}
                        </div>

                        {/* <div className="form-group">
                            <label>Department</label>
                            <select
                                className="select-dropdown"
                                name="taskStatus"
                                value={formData.taskStatus}
                                onChange={handleChange}
                            >
                                <option value="">IT</option>
                                <option value="">Account</option>
                                <option value="">HR</option>
                               
                            </select>
                        </div> */}





                        <div className="form-group">
                            <label>Project</label>
                            <input
                                type="text"
                                name="task"
                                value={formData.task}
                                onChange={handleChange}
                            />
                            {errors.task && <p className="error-message">{errors.task}</p>}
                        </div>

                        <div className="form-group">
                            <label>Project Status</label>
                            <select
                                className="task-status"
                                name="taskStatus"
                                value={formData.taskStatus}
                                onChange={handleChange}
                            >
                                {getTaskStatusOptions().map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                            {errors.taskStatus && <p className="error-message">{errors.taskStatus}</p>}
                        </div>

                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData?.startDate}
                                onChange={handleChange}
                            // min={currDate.toISOString().split('T')[0]}
                            />
                        </div>

                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData?.endDate}
                                onChange={handleChange}
                                min={formData.startDate ? formData.startDate : currDate.toISOString().split('T')[0]}
                            />

                            {errors.dates && <p className="error-message">{errors.dates}</p>}
                        </div>
                    </div>

                    <button type="submit" className="form-submit">
                        Add Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormPage;