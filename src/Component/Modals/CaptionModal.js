import React, {useState} from "react";
import { Button, Modal, ToastContainer } from "react-bootstrap";
import OptionsModal from "./OptionsModal";
import ConfirmationModal from "./ConfirmationModal";
const CaptionModal = (props) =>{
    const [showOptions, setShowOptions] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    const handleOptionsOpen = () => setShowOptions(true);
    const handleOptionsClose = () => setShowOptions(false);
     console.log("captionModal Props:",props.showCaptionModal);
    console.log("Trying to delete post with ID:",props.postId);

    const handleDeleteClick = async () => { 
        try {
           const response = await fetch(`https://instaapp-np7g.onrender.com/api/post/${props.postId}`,{
            method:'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
           })
           if(response.ok){
            setShowConfirmDelete(false);
            props.handleHide();
            props.onPostDeleted(props.postId);
            alert("Post deleted successfully!");
         }else {
            alert("Failed to delete the post.")
         } 
        }
        catch(error) {
            console.error("Error deleting post:",error);
            alert("An error occured while deleting the post.")
         }
        // handleOptionsClose();
        // setShowConfirmDelete(true);
    }
    
    const handleConfirmDelete = () => {
        setShowConfirmDelete(false);
        alert("Post deleted!");
        props.handleHide();
        handleDeleteClick();
    }
  
return (
    <div>
        <Modal
        
          show={props.showCaptionModal}
          onHide={ props.handleHide}
          contentClassName="custom-options-modal"
          size="lg"
          centered
        >
          <Modal.Body className="d-flex p-0">
            <div className=" position-relative w-50">
              <div>
                <Button variant="secondary" onClick={ props.handleBack} style={{ border: '3px solid red', zIndex: 9999 }}>
                  Back
                </Button>
                {!props.isFromGetPost && (
                <Button
                  variant="primary"
                  className="position-absolute top-0 end-0 m-2"
                  onClick={props.isFromGetPost ? props.handleShare: props.handleEditShare}
                  style={{zIndex:1}}
                >
                  Share
                </Button>
                )}
              </div>

              <img
                src={props.selectedImage}
                alt="preview"
                className="img-fluid h-100 w-100"
                style={{ objectFit: "cover", borderRight: "1px solid #ddd" }}
              />
            </div>
            <div className="w-50 p-3 position-relative d-flex flex-column">
                {/* Ellipsis button */}
            <button
               className="btn btn-light position-absolute"
                style={{ top:"10px",right:"10px",zIndex:10}}
                onClick={handleOptionsOpen}
                > 
                 &#8942;
            </button>
              <h5 className="mb-3">Add a caption</h5>
              <textarea
                className="form-control flex-grow-1"
                placeholder="this is the image"
                value={props.captionText}
                onChange={(e) => props.handleCaptionText(e)}
                style={{ resize: "none" }}
              />
            </div>
          </Modal.Body>
        </Modal>
        {/* OptionsModal */}
        <OptionsModal 
        show={showOptions}
        onHide={handleOptionsClose}
        onDelete={ () => {
            handleOptionsClose();
            setShowConfirmDelete(true);
        }
            
        }
        onEdit={() => {
            handleOptionsClose();
            props.handleEdit();
            alert("Edit clicked")
        }}
        onGoToPost={() => {
            handleOptionsClose();
            alert("Go to post clicked");
        }}
         />
         {/* ConfirmationModal */}
         <ConfirmationModal
         show={showConfirmDelete}
         onHide={()=> setShowConfirmDelete(false)}
         onConfirm={handleConfirmDelete} 
         />
    </div>
)
}
export default CaptionModal;