import Button from "react-bootstrap/Button";
import { Container, Table } from "react-bootstrap";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalAction from "./ModalAction";
import ModalDelete from "./ModalDelete";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    fullName: "",
    address: "",
    phone: "",
    status: true,
  });
  const [showModalAction, setShowModalAction] = useState("");
  const [showModalDelete, setShowModalDelete] = useState("");

  const fetchEmployee = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/employees");
      setEmployees(res.data);
    } catch (error) {
      console.log(`Error fetch employee data: ${error}`);
    }
  };

  const getEmployeeByID = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/employees/${id}`);
      setEmployee(res.data);
    } catch (error) {
      console.log(`Error get employee data: ${error}`);
    }
  };

  const createEmployee = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/employees",
        employee
      );
      fetchEmployee();
    } catch (error) {
      console.log(`Error create employee data: ${error}`);
    }
  };

  const updateEmployee = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/employees/${employee.id}`,
        employee
      );
      fetchEmployee();
    } catch (error) {
      console.log(`Error update employee: ${error}`);
    }
  };

  const handleUpdate = (id) => {
    setShowModalAction("Update Employee");
    getEmployeeByID(id);
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      fetchEmployee();
    } catch (error) {
      console.log(`Error delete employee: ${error}`);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <>
      <Container className="mx-auto">
        <h1 className="my-5">Employees</h1>
        <Button
          variant="primary"
          className="mb-4"
          onClick={() => setShowModalAction("Create Employee")}
        >
          <Plus></Plus>
          Create Employee
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.fullName}</td>
                <td>{employee.address}</td>
                <td>{employee.phone}</td>
                <td>{employee.status ? "Active" : "Inactive"}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-3"
                    onClick={() => handleUpdate(employee.id)}
                  >
                    <Edit></Edit>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setShowModalDelete(employee.id)}
                  >
                    <Trash></Trash>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {showModalAction && (
        <ModalAction
          employee={employee}
          setEmployee={setEmployee}
          action={showModalAction}
          onHide={() => setShowModalAction("")}
          handleAction={
            showModalAction === "Create Employee"
              ? createEmployee
              : updateEmployee
          }
        />
      )}

      {showModalDelete && (
        <ModalDelete
          id={showModalDelete}
          onHide={() => setShowModalDelete("")}
          handleAction={deleteEmployee}
        />
      )}
    </>
  );
};

export default Employee;
