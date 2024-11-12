import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const modal = ({ onClose }) => {
    return (
        <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton onClick={onClose}>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Login failed. Please try again.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary">Save</Button> */}
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
};

export default modal;
