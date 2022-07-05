/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";

import "./table.css";

export class Department extends Component {
  constructor(props) {
    super(props);

    this.state = {
      department: [],
      departmentId: 0,
      departmentName: "",
    };
  }

  refreshList() {
    fetch("https://localhost:44385/api/Department/getDepartments")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ department: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44385/api/Department/obrisiPodatak/" + id, {
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

  render() {
    const { department } = this.state;

    return (
      <div name="department">
        <h3 className="naslov">Department</h3>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Department </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {department.map((dep) => (
              <tr className="active-row" key={dep.departmentId}>
                <td>{dep.departmentId}</td>
                <td>{dep.departmentName}</td>
                <td>
                  <button
                    type="button"
                    title="Delete department"
                    className="deleteBtn"
                    onClick={() => this.deleteClick(dep.departmentId)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
