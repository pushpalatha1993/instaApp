import React from "react";
import { Modal,Button} from "react-bootstrap";

const ConfirmationModal = ({show, onHide, onConfirm}) => {
    return (
        <Modal show={show} onhide={onHide} centered>
            <Modal.Body className="text-centered">
              <p>Are you sure you want to delete this post?</p>
              <div className="d-flex justiofy-content-around mt-4">
                <Button variant="danger" onclick={onConfirm}>
                    Delete
                </Button>
                <Button variant="secondary" onclick={onHide}>
                   Cancel
                </Button>

              </div>
            </Modal.Body>
        </Modal>
    )
}
export default ConfirmationModal;