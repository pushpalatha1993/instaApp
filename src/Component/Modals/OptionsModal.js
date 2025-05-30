import React from "react";
// import "./style.css";
import { Modal, Button } from "react-bootstrap";

const OptionsModal = ({ show,onHide, onDelete, onEdit, onGoToPost}) => {
    return (
        <Modal show={show} onHide={onHide} dialogClassName="bottom-modal" centered contentClassName="rounded-top">
            <Modal.Body className="p-0 text-center">
                <div className="d-flex flex-column w-100">
                <Button variant="light" className="border-bottom py-3 text-danger w-100" onClick={onDelete}>
                    Delete
                </Button>
                <Button variant="light" className="border-bottom py-3 w-100" onClick={onEdit}>
                    Edit
                </Button>
                <Button variant="light" className="border-bottom py-3 w-100" onClick={onGoToPost}>
                    Go to post
                </Button>
                <Button variant="light" className=" py-3 w-100" onClick={onHide}>
                    Cancel
                </Button>
                </div>
            </Modal.Body>
        </Modal>
    )

}
export default OptionsModal;