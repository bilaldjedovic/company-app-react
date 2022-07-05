/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";

import "./table.css";

export class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      employeeId: 0,
      ime: "",
      prezime: "",
      departmentId: 0,
      gradId: 0,
      adresa: "",
      telefon: "",
      email: "",
      dateJoining: "",

      departmentFilter: "",
      employeeFilter: "",

      employeeWithoutFilter: [],
    };
  }

  FilterFn() {
    var departmentFilter = this.state.departmentFilter;
    var employeeFilter = this.state.employeeFilter;

    var filteredData = this.state.employeeWithoutFilter.filter(function (e) {
      return (
        e.ime
          .toString()
          .toLowerCase()
          .includes(employeeFilter.toString().trim().toLowerCase()) &&
        e.departmentName
          .toString()
          .toLowerCase()
          .includes(departmentFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ employees: filteredData });
  }
  changeemployeeFilter = (e) => {
    this.state.employeeFilter = e.target.value;
    this.FilterFn();
  };

  changedepartmentFilter = (e) => {
    this.state.departmentFilter = e.target.value;
    this.FilterFn();
  };

  refreshList() {
    fetch("https://localhost:44385/api/Employees/getEmployees")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ employees: data, employeeWithoutFilter: data });
      });

    fetch("https://localhost:44385/api/Department/getDepartments")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ grad: data });
      });

    fetch("https://localhost:44385/api/Grad/getGradovi")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ department: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }
  changeIme = (e) => {
    this.setState({ ime: e.target.value });
  };
  changePrezime = (e) => {
    this.setState({ prezime: e.target.value });
  };
  changeAdresa = (e) => {
    this.setState({ adresa: e.target.value });
  };
  changeTelefon = (e) => {
    this.setState({ telefon: e.target.value });
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44385/api/Employees/obrisiPodatak/" + id, {
        method: "DELETE",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  updateClick() {
    fetch(
      "https://localhost:44385/api/Employees/editEmployee/" +
        this.state.employeeId,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ime: this.state.ime,
          prezime: this.state.prezime,
          adresa: this.state.adresa,
          telefon: this.state.telefon,
          email: this.state.email,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          alert("Success");
          this.refreshList();
          console.log(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  editClick(dep) {
    this.setState({
      employeeId: dep.employeeId,
      ime: dep.ime,
      prezime: dep.prezime,
      adresa: dep.adresa,
      telefon: dep.telefon,
      email: dep.email,
    });
  }
  render() {
    const { employees, employeeId, ime, prezime, adresa, telefon, email } =
      this.state;

    return (
      <div name="employees" className="glavniDivEmp">
        <h3 className="naslov">Employees</h3>
        <div className="filteri">
          <input
            className="input"
            onChange={this.changeemployeeFilter}
            placeholder="Search employees by name"
          />
          <input
            className="input"
            onChange={this.changedepartmentFilter}
            placeholder="Filter departments"
          />
        </div>

        <table className="styled-table">
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Adress</th>
              <th>Town</th>
              <th>Department</th>
              <th>Telephone</th>
              <th>Email</th>
              <th>Date of joining</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr className="active-row" key={emp.employeId}>
                <td>{emp.ime}</td>
                <td>{emp.prezime}</td>
                <td>{emp.adresa}</td>
                <td>{emp.gradIme}</td>
                <td>{emp.departmentName}</td>
                <td>{emp.telefon}</td>
                <td>{emp.email}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {emp.dateJoining.substring(0, 10)}
                </td>
                <td>
                  <div className="btns">
                    <button
                      type="button"
                      className="editBtn"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      title="Edit employee"
                      onClick={() => this.editClick(emp)}
                    >
                      EDIT
                    </button>
                    <button
                      type="button"
                      title="Delete employee"
                      className="deleteBtn"
                      onClick={() => this.deleteClick(emp.employeeId)}
                    >
                      DELETE
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <div>
            <div>
              <h3 className="naslov">Edit employee</h3>

              <div className="form">
                <span>First name</span>
                <input
                  type="text"
                  placeholder="Change first name"
                  ref={ime}
                  defaultValue={this.state.ime}
                  onChange={this.changeIme}
                />

                <span>Last name</span>
                <input
                  type="text"
                  placeholder="Change last name"
                  value={prezime}
                  defaultValue={this.state.prezime}
                  onChange={this.changePrezime}
                />

                <span>Adress</span>
                <input
                  type="text"
                  placeholder="Change adress"
                  ref={adresa}
                  defaultValue={this.state.adresa}
                  onChange={this.changeAdresa}
                />

                <span>Telephone</span>
                <input
                  type="text"
                  placeholder="Change telephone number"
                  value={telefon}
                  defaultValue={this.state.telefon}
                  onChange={this.changeTelefon}
                />

                <span>Email</span>
                <input
                  type="text"
                  placeholder="Change email adress"
                  value={email}
                  defaultValue={this.state.email}
                  onChange={this.changeEmail}
                />

                {employeeId !== 0 ? (
                  <button
                    type="button"
                    className="fade"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
