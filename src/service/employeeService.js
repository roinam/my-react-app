import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/employee',
    timeout: 3000,
    headers: {'Content-Type': 'application/json'}
});

export const getAllEmployee = () => {
    return axiosInstance.get(`/findAll`);
};

export const getEmployeeById = (id) => {
    return axiosInstance.get(`/findById/${id}`);
};

export const createEmployee = (data) => {
    return axiosInstance.post(`/`, data);
};

export const updateEmployee = (data) => {
    return axiosInstance.patch(`/`, data);
};

export const deleteEmployee = (id) => {
    return axiosInstance.delete(`/delete/${id}`);
};