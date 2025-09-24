import Button from "react-bootstrap/Button";
import { Badge, Container, Form, Table, ToastContainer } from "react-bootstrap";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalAction from "./ModalAction";
import ModalDelete from "./ModalDelete";
import ToastNotify from "./ToastNotify";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    id: "",
    fullName: "",
    address: "",
    phone: "",
    status: true,
  });
  const [showModalAction, setShowModalAction] = useState("");
  const [showModalDelete, setShowModalDelete] = useState("");
  const [filter, setFilter] = useState("all");
  const [toasts, setToast] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [employees]);

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
      addToast({
        type: "Success",
        message: "Create a new employee success.",
        variant: "success",
      });
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
      addToast({
        type: "Success",
        message: "Update employee success.",
        variant: "info",
      });
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
      addToast({
        type: "Success",
        message: "Delete employee success.",
        variant: "dark",
      });
      fetchEmployee();
    } catch (error) {
      console.log(`Error delete employee: ${error}`);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const addToast = (newToast) => {
    const toast = { ...newToast, id: new Date().toISOString() };
    setToast((prev) => [...prev, toast]);

    setTimeout(() => {
      setToast((prev) => prev.filter((t) => t.id !== toast.id));
    }, 3000);
  };

  const handleCloseToast = (id) => {
    const newToasts = toasts.filter((toast) => toast.id !== id);
    setToast(newToasts);
  };

  const filteredEmployees =
    filter === "all"
      ? employees
      : employees.filter((empl) => {
          switch (filter) {
            case "active":
              return empl.status;
            case "inactive":
              return !empl.status;
            default:
              return true;
          }
        });
  return (
    <>
      <Container className="mx-auto">
        <h1 className="my-5">Employees</h1>
        <div className="d-flex align-items-center justify-content-between">
          <Button
            variant="primary"
            className="mb-4"
            onClick={() => setShowModalAction("Create Employee")}
          >
            <Plus></Plus>
            Create Employee
          </Button>
          <div className="d-flex align-items-center gap-3">
            <Form.Label className="flex-fill">Filter by status:</Form.Label>
            <Form.Select
              aria-label="Default select example"
              className="w-auto"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </div>
        </div>
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
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center fw-bold fs-5">
                  Employee is empty!
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.fullName}</td>
                  <td>{employee.address}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <Badge
                      className={employee.status ? "bg-info" : "bg-warning"}
                    >
                      {employee.status ? "Active" : "Inactive"}
                    </Badge>
                  </td>
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
              ))
            )}
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

      <div aria-live="polite" aria-atomic="true">
        <ToastContainer
          position="top-end"
          className="p-3"
          style={{ zIndex: 1 }}
        >
          {toasts.map((toast) => (
            <ToastNotify
              key={toast.id}
              toast={toast}
              onHide={() => handleCloseToast(toast.id)}
            />
          ))}
        </ToastContainer>
      </div>
    </>
  );
};

export default Employee;
