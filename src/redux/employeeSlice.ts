import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import axios from "axios";

interface Employee {
  id: number;
  name: string;
  salary: number;
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    fetchEmployeesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEmployeesSuccess: (state, action: PayloadAction<Employee[]>) => {
      state.loading = false;
      state.employees = action.payload;
    },
    fetchEmployeesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addEmployeeSuccess: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    updateSalarySuccess: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index].salary = action.payload.salary;
      }
    },
    deleteEmployeeSuccess: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    }
  },
});

export const {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  addEmployeeSuccess,
  updateSalarySuccess,
  deleteEmployeeSuccess,
} = employeeSlice.actions;

export default employeeSlice.reducer;

// Thunks

export const fetchEmployees = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchEmployeesStart());
    const response = await axios.get("http://localhost:5000/employees");
    dispatch(fetchEmployeesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchEmployeesFailure(error.message));
  }
};

export const addEmployee = (employee: Omit<Employee, "id">) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/employees", employee);
    dispatch(addEmployeeSuccess(response.data));
  } catch (error) {
    console.error("Error adding employee", error);
  }
};

export const updateSalary = (id: number, salary: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.patch(`http://localhost:5000/employees/${id}`, { salary });
    dispatch(updateSalarySuccess(response.data));
  } catch (error) {
    console.error("Error updating salary", error);
  }
};

export const deleteEmployee = (id: number) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`http://localhost:5000/employees/${id}`);
    dispatch(deleteEmployeeSuccess(id));
  } catch (error) {
    console.error("Error deleting employee", error);
  }
};
