import { useState } from "react";
import { EmployeeDetail } from "./EmployeeDetail";
import { EditEmployee } from "./EditEmployee";

export const EmployeePage = (prop) => {

    const [editMode, setEditMode] = useState(false);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    return <>
    {!editMode 
    ? <EmployeeDetail onEdit={handleEdit}></EmployeeDetail>
    : <EditEmployee onEditCancel={handleCancel}></EditEmployee>
    }
    </>
};