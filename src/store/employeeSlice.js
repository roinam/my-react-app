import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllEmployee } from '../service/employeeService';

// Delay Just for DEMO
const delay = async (ms) => {
  return new Promise((resolve) => 
      setTimeout(resolve, ms));
};

export const fetchAllEmployee = createAsyncThunk(
  'employee/fetchAllEmployee',
  async () => {
    const res = await getAllEmployee();//axios('http://localhost:8080/employee/findAll')
    //await delay(2000);
    const data = await res.data
    return data
  }
)

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employeeList: [],
    theEmployee: {},
    isLoading: false,
    error: null
  },
  reducers: {
    storeEmployeeList: (state, action) => {
      return {...state, employeeList: action.payload};
    },
    storeTheEmployee: (state, action) => {
        return {...state, theEmployee: action.payload};
    },
    removeTheEmployee: (state, action) => {
        const newList = state.employeeList.filter(emp => emp.empId != action.payload);
        return {...state, employeeList: [...newList]};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllEmployee.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAllEmployee.fulfilled, (state, action) => {
      state.isLoading = false
      state.employeeList = action.payload
    })
    builder.addCase(fetchAllEmployee.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export const { storeEmployeeList, storeTheEmployee, removeTheEmployee } = employeeSlice.actions;