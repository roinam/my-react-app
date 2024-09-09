import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { updateEmployee } from "../service/employeeService";

export const EditEmployee = (prop) => {
    const params = useParams();
    console.log("params: ", params);

    const [searchParams, setSearchparams] = useSearchParams();
    console.log("searchParams: ", searchParams.get("sp"));

    const employee = useSelector(state => state.employee.theEmployee);

    const [theEmployee, setTheEmployee] = useState({...employee});
    const [errors, setErrors] = useState({});

    const inputRef = useRef(null);

    const navigate = useNavigate();

    const handleChange = (event, field) => {
        console.log("Current Emp ID: ", inputRef.current.value);

        setTheEmployee({
            ...theEmployee,
            [field]: event.target.value
        });
    }

    const handleSave = (event) => {
        event.preventDefault();

        const validationErr = validateForm(theEmployee);
        setErrors(validationErr);

        if(validationErr && Object.keys(validationErr).length>0)
            return false;

        updateEmployee(theEmployee)
        .then(response => {
            if(response && response.data)
                navigate("/");
        })
        .catch(() => {});
    };

    const handleCancel = () => {
        prop.onEditCancel();
    };

    const validateForm = (data) => {
        const errors = {};

        if (!data.empName.trim()) {
            errors.empName = 'Employee Name is required';
        } else if (data.empName.length < 4) {
            errors.empName = 'Employee Name must be at least 4 characters long';
        }

        return errors;
    };

    return <>
    <form className="form-style" onSubmit={handleSave}>
        <div className="mb-3 d-flex justify-content-center">
            <h4>Update - Employee Detail</h4>
        </div>
        <div className="mb-3">
            <label htmlFor="emp-name" className="form-label">Employee ID</label>
            <input disabled type="text" className="form-control" id="emp-name" placeholder="" ref={inputRef}
            name="empId" value={theEmployee.empId}/>
        </div>
        <div className="mb-3">
            <label htmlFor="emp-name" className="form-label">Employee Full Name</label>
            <input type="text" className="form-control" id="emp-name" placeholder=""
            name="empName" value={theEmployee.empName} onChange={(e) => handleChange(e, "empName")}/>
            {errors.empName && (
                <span className="error-message">
                    {errors.empName}
                </span>
            )}
        </div>
        <div className="mb-3">
            <label htmlFor="designation" className="form-label">Designation</label>
            <input type="text" className="form-control" id="designation" placeholder=""
            name="designation" value={theEmployee.designation} onChange={(e) => handleChange(e, "designation")}/>
        </div>
        <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <input type="text" className="form-control" id="department" placeholder=""
            name="department" value={theEmployee.department} onChange={(e) => handleChange(e, "department")}/>
        </div>
        <div className="mb-3">
            <label htmlFor="salary" className="form-label">Annual Salary</label>
            <input type="number" className="form-control" id="salary" placeholder=""
            name="salary" value={theEmployee.salary} onChange={(e) => handleChange(e, "salary")}/>
        </div>
        <div className="d-flex mt-5">
            <div className="col-sm-2">
            <button type="submit" className="btn btn-success" 
            // onClick={handleSave} 
            style={{width:"80px"}}>
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