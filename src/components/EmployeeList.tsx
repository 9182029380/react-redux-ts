import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateSalary } from "../redux/employeeSlice";
import './EmployeeList.css'; // Link to your list styles

const EmployeeList: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employee.employees);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState<number | null>(null);
  const [newSalary, setNewSalary] = useState<number>(0);

  const handleEdit = (id: number) => {
    setEditId(id);
  };

  const handleSave = (id: number) => {
    dispatch(updateSalary({ id, salary: newSalary }));
    setEditId(null);
    setNewSalary(0);
  };

  return (
    <ul className="employee-list">
      {employees.map((employee) => (
        <li key={employee.id}>
          {employee.name} - 
          {editId === employee.id ? (
            <>
              <input
                type="number"
                value={newSalary}
                onChange={(e) => setNewSalary(Number(e.target.value))}
              />
              <button onClick={() => handleSave(employee.id)}>Save</button>
            </>
          ) : (
            <>
              <span> Salary: ${employee.salary}</span>
              <button onClick={() => handleEdit(employee.id)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
