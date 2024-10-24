import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store"; // Use the custom typed hook
import { fetchEmployees, updateSalary, deleteEmployee } from "../redux/employeeSlice";
import './EmployeeList.css';

const EmployeeList: React.FC = () => {
  const { employees, loading, error } = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteEmployee(id));
  };

  const handleUpdateSalary = (id: number, newSalary: number) => {
    dispatch(updateSalary(id, newSalary));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul className="employee-list">
      {employees.map((employee) => (
        <li key={employee.id}>
          {employee.name} - Salary: ${employee.salary}
          <button onClick={() => handleUpdateSalary(employee.id, employee.salary + 5000)}>
            Increase Salary
          </button>
          <button onClick={() => handleDelete(employee.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
