import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { deleteEmployee, getAllEmployee } from "../service/employeeService";
import { useDispatch, useSelector } from "react-redux"
import { fetchAllEmployee, removeTheEmployee, storeEmployeeList, storeTheEmployee } from "../store/employeeSlice";
import { PureComp } from "../component/PureComp";
import { ParentRenderProp } from "../component/rendererProp/ParentRenderProp";

const EmployeeList = (prop) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allEmployeeList = useSelector(state => state.employee.employeeList);
    const isLoading = useSelector((state) => state.employee.isLoading)
    const errorInLoading = useSelector((state) => state.employee.error)

    useEffect(() => {
        const tryThunk = true;
        if(tryThunk) {
            dispatch(fetchAllEmployee());
        } else {
            getAllEmployee()
            .then(response => {
                if(response && response.data){
                    dispatch(storeEmployeeList(response.data));
                } else{
                    dispatch(storeEmployeeList([]));
                }
            })
            .catch(error => {
                dispatch(storeEmployeeList([]));
            });
        }
    }, []);

    // if(allEmployeeList.length==0)
    // throw new Promise((resolve) => setTimeout(resolve, 2000)); 

    const handleView = (employee) => {
        dispatch(storeTheEmployee({...employee}));
        navigate(`/view/${employee.empId}`);
    };

    const handleDelete = (id) => {
        deleteEmployee(id)
        .then(response => {
            if(response && response.data){
                dispatch(removeTheEmployee(id));
            }
        })
        .catch(() => {});
    };

    const handleAdd = () => {
        navigate("/add");
    }

    if(isLoading) {
        return <>
            <div className="container">
                Loading.....
            </div>
        </>;
    }

    if(errorInLoading) {
        return <>
            <div className="container">
                Sorry! Unable to load data
                <div className="mt-3" style={{color:"red"}}>{errorInLoading}</div>
            </div>
        </>;
    }

    return <>
    <PureComp name={"Testing"}></PureComp>
    <ParentRenderProp></ParentRenderProp>
    
    <div className="d-flex flex-row mb-3">
        <button type="button" className="btn btn-primary" onClick={handleAdd}>
            <i className="fa-solid fa-plus"></i>
            Add New Employee
        </button>

        {/* <button type="button" className="btn btn-primary" style={{marginLeft:"3px"}}
        onClick={() => {throw new Error('Crashed!!!!');}}>
            <i className="fa-solid fa-plus"></i>
            Show Error
        </button> */}
    </div>

        <table className="table table-striped">
        <thead className="table-dark">
            <tr>
                <th scope="col">Emp#</th>
                <th scope="col">Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Department</th>
                <th scope="col">Salary</th>
                <th scope="col" style={{width:"80px"}}></th>
                <th scope="col" style={{width:"80px"}}></th>
            </tr>
        </thead>
        <tbody>
            {allEmployeeList && allEmployeeList.map(employee => 
                <tr key={employee.empId}>
                    <th scope="row">{employee.empId}</th>
                    <td>{employee.empName}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.department}</td>
                    <td>{employee.salary}</td>
                    <td>
                    <button type="button" className="btn btn-outline-info" onClick={() => handleView(employee)}>View</button>
                    </td>
                    <td>
                    <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(employee.empId)}>Delete</button>
                    </td>
                </tr>
            )}
        </tbody>
        </table>
    </>;
};

export default EmployeeList;