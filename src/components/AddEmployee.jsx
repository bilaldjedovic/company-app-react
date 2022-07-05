import React, { useEffect, useState } from "react";
import "./addEmp.css";

const AddEmployee = () => {
  const [grad, setGrad] = useState([]);
  const [department, setDepartment] = useState([]);

  var newEmployee = {
    ime: "",
    prezime: "",
    adresa: "",
    gradId: 0,
    departmentId: 0,
    telefon: "",
    email: "",
    dateJoining: "",
  };

  const fetchGrad = async () => {
    try {
      const response = await fetch(
        "https://localhost:44385/api/Grad/getGradovi"
      );
      if (!response.ok) throw Error("Did not recived expected data");
      const data = await response.json();
      console.log(data);
      setGrad(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchDepartment = async () => {
    try {
      const response = await fetch(
        "https://localhost:44385/api/Department/getDepartments"
      );
      if (!response.ok) throw Error("Did not recived expected data");
      const data = await response.json();
      console.log(data);
      setDepartment(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    (async () => await fetchGrad())();
    (async () => await fetchDepartment())();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(newEmployee);

    try {
      fetch("https://localhost:44385/api/Employees/addEmployee", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      }).then(() => {
        console.log("New employee successfully added ");
        alert("New employee successfully added  !");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div name="addEmployee">
      <div>
        <h3 className="naslov">Add Employees</h3>
      </div>
      <form className="form">
        <label>First name</label>
        <input
          required
          type="text"
          placeholder="Type first name"
          onChange={(e) => {
            newEmployee.ime = e.target.value;
          }}
        />

        <label>Last name</label>
        <input
          required
          type="text"
          placeholder="Type last name"
          onChange={(e) => {
            newEmployee.prezime = e.target.value;
          }}
        />

        <label>Adress</label>
        <input
          required
          type="text"
          placeholder="Type adress"
          onChange={(e) => {
            newEmployee.adresa = e.target.value;
          }}
        />

        <label>Town</label>
        <select
          id="grad"
          required
          onChange={(e) => {
            newEmployee.gradId = parseInt(e.target.value);
          }}
        >
          <option disabled selected hidden>
            Choose town
          </option>
          {grad.map((gra) => (
            <option value={gra.gradId}>{gra.gradIme}</option>
          ))}
        </select>

        <label>Department</label>
        <select
          id="department"
          required
          onChange={(e) => {
            newEmployee.departmentId = parseInt(e.target.value);
          }}
        >
          <option disabled selected hidden>
            Choose department
          </option>
          {department.map((dep) => (
            <option value={dep.departmentId}>{dep.departmentName}</option>
          ))}
        </select>

        <label>Telephone</label>
        <input
          required
          type="text"
          placeholder="Type telephone number"
          onChange={(e) => {
            newEmployee.telefon = e.target.value;
          }}
        />

        <label>Email</label>
        <input
          required
          type="text"
          placeholder="Type email adress"
          onChange={(e) => {
            newEmployee.email = e.target.value;
          }}
        />

        <label>Date of joining</label>
        <input
          type="date"
          placeholder="Choose date of joining"
          onChange={(e) => {
            newEmployee.dateJoining = e.target.value;
          }}
        />

        <button className="fade" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
