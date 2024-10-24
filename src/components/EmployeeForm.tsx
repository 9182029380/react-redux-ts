import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/employeeSlice";
import './EmployeeForm.css'; // Link to your form styles

const EmployeeForm: React.FC = () => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState<number>(0);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addEmployee({ name, salary }));
    setName("");
    setSalary(0);
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input
        type="text"
        placeholder="Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
        required
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
