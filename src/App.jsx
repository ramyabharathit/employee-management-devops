import { useState } from "react";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Ramya",
      role: "DevOps Engineer",
      location: "Chennai",
    },
    {
      id: 2,
      name: "Harshi",
      role: "Developer",
      location: "Bangalore",
    },
    {
      id: 3,
      name: "Thanshi",
      role: "Tester",
      location: "Chennai",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  const resetForm = () => {
    setName("");
    setRole("");
    setLocation("");
    setEditingId(null);
    setShowForm(false);
  };

  const saveEmployee = () => {
    if (!name || !role || !location) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editingId
            ? {
                ...employee,
                name,
                role,
                location,
              }
            : employee
        )
      );
    } else {
      const newEmployee = {
        id: Date.now(),
        name,
        role,
        location,
      };

      setEmployees([...employees, newEmployee]);
    }

    resetForm();
  };

  const editEmployee = (employee) => {
    setName(employee.name);
    setRole(employee.role);
    setLocation(employee.location);
    setEditingId(employee.id);
    setShowForm(true);
  };

  const deleteEmployee = (id) => {
    setEmployees(
      employees.filter((employee) => employee.id !== id)
    );
  };

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.role} ${employee.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Employee Management</h1>

      <button onClick={() => setShowForm(true)}>
        Add Employee
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {showForm && (
        <div>
          <h2>
            {editingId ? "Edit Employee" : "Add Employee"}
          </h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button onClick={saveEmployee}>
            {editingId ? "Update" : "Add"}
          </button>

          <button onClick={resetForm}>
            Cancel
          </button>
        </div>
      )}

      <br />

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.location}</td>

              <td>
                <button
                  onClick={() => editEmployee(employee)}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteEmployee(employee.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;