import { Button, Modal } from "react-bootstrap";

const ModalDelete = ({ id, onHide, handleAction }) => {
  const handleDelete = () => {
    handleAction(id);
    onHide();
  };

  return (
    <Modal show="true" onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete employee with id {id}!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;
