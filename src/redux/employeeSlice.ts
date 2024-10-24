import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  id: number;
  name: string;
  salary: number;
}

interface EmployeeState {
  employees: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Omit<Employee, "id">>) => {
      const newEmployee: Employee = {
        id: state.employees.length + 1,
        ...action.payload,
      };
      state.employees.push(newEmployee);
    },
    updateSalary: (state, action: PayloadAction<{ id: number; salary: number }>) => {
      const employee = state.employees.find(emp => emp.id === action.payload.id);
      if (employee) {
        employee.salary = action.payload.salary;
      }
    },
  },
});

export const { addEmployee, updateSalary } = employeeSlice.actions;
export default employeeSlice.reducer;
