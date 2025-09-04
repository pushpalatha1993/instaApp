import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { Navigate } from "react-router-dom"
import CaptionModal from "../../Component/Modals/CaptionModal";
import Navbar from "../auth/Navbar";
import { Button, Modal, ToastContainer } from "react-bootstrap";
import "../auth/login/style.css";
import {toast} from 'react-toastify';

export default class Createpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false,
      showModal: false,
      file: null,
      selectedImage: null,
      showConfirmationModal: false,
      showDiscardModal: false,
      showCaptionModal: false,
      captionText: "",
      userId: props.userId || localStorage.getItem('userId') ||null,
      showPreviewModal: false,
      
    };
  }

  componentDidMount(prevProps) {
    const token = localStorage.getItem("token");
   const userId =  localStorage.getItem("userId")
   
    if(this.props && this.props.userId){
      console.log('ComponentDidMount UserId:',this.props.userId);
    }else{
      console.log('no userId in props');
    }
  }
  handleCreateClick = () => {
    alert("create button clicked!");
  };
  handleLoggedout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    localStorage.removeItem("name");
    localStorage.removeItem("userId")
    localStorage.clear();
    // window.location.href = "/";
    console.log("LoggedOut,token removed.")
    this.setState({ isLoggedOut: true });
    };
    handlePreviewModal = () => {
      this.setState({ showPreviewModal:true})
    }
  handleShow = () => {
    this.setState({ showModal: true });
  };
  handleClose = () => {
    this.setState({ showModal: false, file: null });
  };
  handleFileChange = (e) => {
    console.log("e.target",e.target)
    console.log("e.target.files",e.target.files)
    const file = e.target.files[0];
    console.log("selected file:",file)
    this.setState({file});
     };
  handleUpload = () => {
    const {file} = this.state;
    if (file) {
      console.log("Uploading file:", this.state.file);
      const imageUrl= URL.createObjectURL(file);
      this.setState({
        selectedImage:imageUrl,
        showModal:false,
        // showCaptionModal:true,
      })
    }else{
      toast.error("please select a file before")
    }
    // this.handleClose()
    this.setState({ showConfirmationModal: true });
  };
  handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      this.setState({
        selectedImage: imageUrl,
       showConfirmationModal: true,
      });
    }
  };
  handleBack = () => {
    this.setState({ showConfirmationModal: true, showDiscardModal: false,showCaptionModal: false,showImageModal:true });
  };
  handleDiscard = () => {
    this.setState({
      selectedImage: null,
      showDiscardModal: false,
    });
  };
  handleCancelDiscard = () => {
    this.setState({ showDiscardModal: false, showConfirmationModal: true });
  };
  handleNext = () => {
    this.setState({
      showConfirmationModal: false,
      showCaptionModal: true,
    });
  };
  handleShare = () => {
     
    const {userId,captionText,selectedImage,imageUrl} = this.state;

    // if(!imageUrl || !captionText){
      // toast.error("please select an image and write a caption.")
      // return;
    // }
    if(!userId) {
      toast.error("User ID not found.Cannot ctreate post.");
      console.error("user Id not found.Cannot create post.")
      return;
    }
    console.log("sharing", this.state.captionText);
    if(!selectedImage) {
      toast.error("No image selected.");
      return;
    }

    const postData = {
      caption: captionText,
      imageUrl:selectedImage,
      userId:userId ,
    };
    console.log("strating API call: creating post", postData);
    fetch("https://instaapp-np7g.onrender.com/api/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create post");
        }
        return response.json();
      })
      .then((data) => {
        console.log("post created successfully:", data);
        toast.success("Post create successfully!");
        this.setState({captionText: '',imageUrl: ''});
        // this.props.onPostCreated();
        // this.setState({newPostAdded:true})
        if (this.props.onPostCreated){
          this.props.onPostCreated();
        }
        
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        toast.error("Failed to create post.Please try again.")
      });
    this.setState({
      showCaptionModal: false,
      captionText: "",
      selectedImage: null,
      showModal:false,
    });
  };

  handleHide =() => this.setState({ showCaptionModal: false })
  handlecaptionText = (e) => this.setState({captionText: e.target.value})
  render() {
    const { selectedImage, showConfirmationModal, showDiscardModal } =
      this.state;
    if (this.state.isLoggedOut) {
      return <Navigate to="/login" />;
      // <p> welcome {this.state.username||'user'}</p>
    }
   
    

    return (
        
      <div>
        
        <div className="text-center mt-4">
          {/* <img
            src="https://plus.unsplash.com/premium_photo-1681290358247-c160fc097bdb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGxhbnR8ZW58MHx8MHx8fDA%3D"
            alt="Selected"
            className="img-fluid rounded mx-auto d-block"
            style={{ maxHeight: "300px", maxWidth: "90%" }}
          /> */}
        </div> 
       
        {/* <div>
          <button
            variant="primary"
            className="d-inline-flex align-items-center"
            style={{top:"10px",left:"10px"}}
            onClick={this.handleShow}
          >
            <FiPlus className="me-2" />
            Create
          </button>
        </div> */}

        {/* Create Post Modal */}
        <Modal
          show={this.props.showModal}
          onHide={this.props.handleClose}
          centered
          contentClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title className="w-100 text-center">Create Post</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div
              className="upload-area border p-4 mb-3 text-center"
              style={{
                borderStyle: "dashed",
                textAlign: "center",
                backgroundColor: "#f8f9fa",
                borderColor: "#ccc",
                borderWidth: "2px",
              }}
            >
              <p>Drag and Drop your file here</p>
              <p>or</p>
              <input
                type="file"
                onChange={this.handleFileChange}
                className="form-control"
              />
              {this.state.file && (
                <p className="mt-2 text-success">
                  Selected:{this.state.file.name}
                </p>
              )}
            </div>
            <Modal.Footer
              className="d-flex justify-content-end gap-2 "
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <button className="btn btn-secondary" onClick={this.handleClose}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={this.handleUpload}>
                Upload
              </button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>

        <div className="p-4">
          {/* Confirm Image */}
          <Modal
            show={this.state.showConfirmationModal}
            onHide={() => this.setState({ showConfirmationModal: false })}
            contentClassName="custom-modal"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedImage && (
                <img src={selectedImage} alt="selected" className="img-fluid" />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleBack}>
                Back
              </Button>
              <Button variant="primary" onClick={this.handleNext}>
                Next
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Discard Image */}

          <Modal
            show={showDiscardModal}
            onHide={() => this.setState({ showDiscardModal: false })}
            contentClassName="custom-modal"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Discard Image?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to discard the selected image?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.handleCancelDiscard}>
                Discard
              </Button>
              <Button
                variant="secondary"
                onClick={() => this.setState({ showDiscardModal: false })}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* Share Image */}

        <CaptionModal handleBack={this.handleBack } handleHide={this.handleHide } handlecaptionText={this.handlecaptionText} showCaptionModal={this.state.showCaptionModal} handleShare={this.handleShare} selectedImage={this.state.selectedImage} captionText={this.state.captionText}/>

        {/* <Modal show ={show} onHide={onHide} size="lg" centered>
          <Modal.Body className="d-flex p-0">
            
            <div className="w-50">
              <img
              src={image}
              alt="Selected"
              className="img-fluid h-100 w-100"
              style={{ objectFit: 'cover'}}
              />
            </div>

            
            <div className="W-50 p-4 d-flex flex-column justify-content-between">
              <div>
                <h5>Caption</h5>
                <p>{caption}</p>
              </div>
              <div className="text-end">
                <Button variant="secondary" onClick={onHide}>
                  Close
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal> */}
        <ToastContainer/>
      </div>
    );
  }
  }
// }
