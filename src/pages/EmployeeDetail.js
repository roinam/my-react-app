import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export const EmployeeDetail = (prop) => {
    const params = useParams();
    console.log("params: ", params);

    const [searchParams, setSearchparams] = useSearchParams();
    console.log("searchParams: ", searchParams.get("sp"));

    const employee = useSelector(state => state.employee.theEmployee);

    const [theEmployee, setTheEmployee] = useState({...employee});

    // const navigate = useNavigate();

    const handleEdit = () => {
        prop.onEdit();
    };

    return <>
    <form className="form-style">
        <div className="mb-3 d-flex justify-content-center">
            <h4>Employee Detail</h4>
        </div>
        <div className="mb-3">
            <label htmlFor="emp-name" className="form-label">Employee ID</label>
            <input disabled type="text" className="form-control" id="emp-name" placeholder=""
            name="empId" value={theEmployee.empId}/>
        </div>
        <div className="mb-3">
            <label htmlFor="emp-name" className="form-label">Employee Full Name</label>
            <input disabled type="text" className="form-control" id="emp-name" placeholder=""
            name="empName" value={theEmployee.empName}/>
        </div>
        <div className="mb-3">
            <label htmlFor="designation" className="form-label">Designation</label>
            <input disabled type="text" className="form-control" id="designation" placeholder=""
            name="designation" value={theEmployee.designation}/>
        </div>
        <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <input disabled type="text" className="form-control" id="department" placeholder=""
            name="department" value={theEmployee.department}/>
        </div>
        <div className="mb-3">
            <label htmlFor="salary" className="form-label">Annual Salary</label>
            <input disabled type="number" className="form-control" id="salary" placeholder=""
            name="salary" value={theEmployee.salary}/>
        </div>
        <div className="d-flex mt-5">
            <div className="col-sm-2">
            <button type="submit" className="btn btn-success" 
            onClick={handleEdit} 
            style={{width:"80px"}}>
                Edit
            </button>
            </div>
        </div>
    </form>
    </>;
};