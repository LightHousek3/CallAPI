import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ModalAction = ({
  employee,
  setEmployee,
  action,
  onHide,
  handleAction,
}) => {
  const isUpdate = action === "Update Employee" ? true : false;
  const [errors, setError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!employee.fullName.trim()) {
      errors.fullName = "Full name can't be empty!";
    }
    if (!employee.address.trim()) {
      errors.address = "Address name can't be empty!";
    }
    if (!employee.phone.trim()) {
      errors.phone = "Phone name can't be empty!";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    handleAction();
    onHide();
  };

  return (
    <Modal
      show="true"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{action}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {isUpdate ? (
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control
                disabled
                name="id"
                type="text"
                readOnly
                value={employee.id}
              />
            </Form.Group>
          ) : (
            ""
          )}
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="fullName"
              type="text"
              required
              isInvalid={errors.fullName}
              value={employee.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="address"
              type="text"
              required
              isInvalid={errors.address}
              value={employee.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="phone"
              type="number"
              required
              isInvalid={errors.phone}
              value={employee.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              onChange={handleChange}
              name="status"
              aria-label="Choose one status"
              required
              value={employee.status}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3 w-100">
            {isUpdate ? "Update" : "Create"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAction;
