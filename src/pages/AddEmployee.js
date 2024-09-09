import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../service/employeeService";

export const AddEmployee = (prop) => {

    const [theEmployee, setTheEmployee] = useState({});
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (event, field) => {
        setTheEmployee({
            ...theEmployee,
            [field]: event.target.value
        });
    }

    const handleSave = () => {
        const validationErr = validateForm(theEmployee);
        setErrors(validationErr);

        if(validationErr && Object.keys(validationErr).length>0)
            return false;

        createEmployee(theEmployee)
        .then(response => {
            if(response && response.data)
                navigate("/");
        })
        .catch(() => {});
    };

    const handleCancel = () => {
        navigate("/");
    };

    const validateForm = (data) => {
        const errors = {};

        if (!data.empName || !data.empName.trim()) {
            errors.empName = 'Employee Name is required';
        } else if (data.empName.length < 4) {
            errors.empName = 'Employee Name must be at least 4 characters long';
        }

        return errors;
    };

    return <>
    <form className="form-style">
        <div className="mb-3 d-flex justify-content-center">
            <h4>Create - Employee Detail</h4>
        </div>
        {/* <div className="mb-3">
            <label for="emp-name" className="form-label">Employee ID</label>
            <input disabled type="text" className="form-control" id="emp-name" placeholder=""
            value={theEmployee.empId}/>
        </div> */}
        <div className="mb-3">
            <label for="emp-name" className="form-label">Employee Full Name</label>
            <input type="text" className="form-control" id="emp-name" placeholder=""
            value={theEmployee.empName} onChange={(e) => handleChange(e, "empName")}/>
            {errors.empName && (
                <span className="error-message">
                    {errors.empName}
                </span>
            )}
        </div>
        <div className="mb-3">
            <label for="designation" className="form-label">Designation</label>
            <input type="text" className="form-control" id="designation" placeholder=""
            value={theEmployee.designation} onChange={(e) => handleChange(e, "designation")}/>
        </div>
        <div className="mb-3">
            <label for="department" className="form-label">Department</label>
            <input type="text" className="form-control" id="department" placeholder=""
            value={theEmployee.department} onChange={(e) => handleChange(e, "department")}/>
        </div>
        <div className="mb-3">
            <label for="salary" className="form-label">Annual Salary</label>
            <input type="number" className="form-control" id="salary" placeholder=""
            value={theEmployee.salary} onChange={(e) => handleChange(e, "salary")}/>
        </div>
        <div className="d-flex mt-5">
            <div className="col-sm-2">
            <button type="button" className="btn btn-success" onClick={handleSave} style={{width:"80px"}}>
                Save
            </button>
            </div>
            <div className="col-sm-2">
            <button type="button" className="btn btn-secondary" onClick={handleCancel} style={{width:"80px"}}>
                Cancel
            </button>
            </div>
        </div>
    </form>
    </>;
};