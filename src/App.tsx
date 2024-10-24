import React from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Salary Management Application</h1>
      <EmployeeForm />
      <EmployeeList />
    </div>
  );
};

export default App;
