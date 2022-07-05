import "./addEmp.css";

const AddDep = () => {
  var newDep = {
    departmentId: 0,
    departmentName: "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(newDep);

    try {
      fetch("https://localhost:44385/api/Department/addDepartment", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDep),
      }).then(() => {
        console.log("Department added");
        alert("New department successfully added  !");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div name="addDepartment">
      <h3 className="naslov">Add department</h3>
      <form className="form">
        <label>Department name:</label>
        <input
          required
          type="text"
          placeholder="Department name"
          onChange={(e) => {
            newDep.departmentName = e.target.value;
          }}
        />
        <button className="fade" type="submit" onClick={(e) => handleSubmit(e)}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default AddDep;
