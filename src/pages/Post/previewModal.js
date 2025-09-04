import React from "react";
import {Modal, Button} from "react-bootstrap";

const previewModal = ({show, onHide, image, caption}) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Body className="d-flex p-0">
                <div className="w-50">
                    <img src={image}
                    alt="preview"
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: "cover", borderRight: "1px solid #ddd"}}
                    />
                    </div>
                    <div className="w-50 p-4 d-flex flex-column justify-content-between">
                        <div>
                            <h5>Caption</h5>
                            <p>{caption}</p>
                        </div>
                        <div className="text-end">
                            <Button variant="secondary" onclick={onHide}>
                                Close
                            </Button>
                             </div>
                              </div>

            </Modal.Body>
        </Modal>
    )
}
export default previewModal;