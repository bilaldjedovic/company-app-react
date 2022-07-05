import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Employee } from "./components/Employee";
import AddEmployee from "./components/AddEmployee";
import AddDep from "./components/AddDep";
import { Department } from "./components/Department";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Employee />
      <AddEmployee />
      <Department />
      <AddDep />
    </div>
  );
}

export default App;
