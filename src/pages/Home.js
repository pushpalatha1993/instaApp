import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./auth/Navbar";
import { FiPlus } from "react-icons/fi";
import { Button, Modal } from "react-bootstrap";
import "./auth/login/style.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false,
      username: "",
      showModal: false,
      file: null,
      selectedImage: null,
      showConfirmationModal: false,
      showDiscardModal: false,
      showCaptionModal: false,
      captionText: "",
      userId: props.userId || localStorage.getItem('userId') ||null,
    };
  }

  componentDidMount(prevProps) {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("name");
    const userId =  localStorage.getItem("userId")
    this.setState({ username: storedUsername });

    if (!token) {
      this.setState({ isLoggedOut: true });
    }
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
    localStorage.removeItem("username");
    localStorage.clear();
    window.location.href = "/";
    // console.log("LoggedOut,token removed.")
    this.setState({ isLoggedOut: true });
  };
  handleShow = () => {
    this.setState({ showModal: true });
  };
  handleClose = () => {
    this.setState({ showModal: false, file: null });
  };
  handleFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };
  handleUpload = () => {
    if (this.state.file) {
      console.log("Uploading file:", this.state.file);
    }
    // this.handleClose()
    this.setState({ showConfirmationModal: true });
  };
  handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({
        selectedImage:
          "https://www.pexels.com/photo/green-succulent-plants-on-pots-1470171/ ",
        showConfirmationModal: true,
      });
    }
  };
  handleBack = () => {
    this.setState({ showConfirmationModal: false, showDiscardModal: true });
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
  handleshare = () => {
    const userId = this.state.userId;
    if(!this.props.userId) {
      console.error("user Id not found.Cannot create post.")
      return;
    }
    console.log("sharing", this.state.captionText);

    const postData = {
      caption: this.state.captionText,
      imageUrl:
        "https://www.pexels.com/photo/green-succulent-plants-on-pots-1470171/",
        userId:this.props.userId ,
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
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
    this.setState({
      showCaptionModal: false,
      captionText: "",
      selectedImage: null,
    });
  };

  render() {
    const { selectedImage, showConfirmationModal, showDiscardModal } =
      this.state;
    if (this.state.isLoggedOut) {
      return <Navigate to="/login" />;
      // <p> welcome {this.state.username||'user'}</p>
    }

    return (
      <div>
        <Navbar username={this.state.username} />
        <div className="home-container">
          <h1>Home Page</h1>
          <p>You are logged in. {this.state.username}</p>
        </div>
        <div className="text-center mt-4">
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sketchappsources.com%2Ffree-source%2F2668-instagram-home-view-ios-sketch-freebie-resource.html&psig=AOvVaw3FNmTk24W9eRT13tfXQODx&ust=1744911148957000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiTwt2K3YwDFQAAAAAdAAAAABAE"
            // alt="welcome"
            className="img-fluid rounded"
            style={{ maxWidth: "90%", height: "auto" }}
          />
        </div>
        <div>
          <button
            variant="primary"
            className="d-inline-flex align-items-center"
            onClick={this.handleShow}
          >
            <FiPlus className="me-2" />
            Create
          </button>
        </div>

        {/* Create Post Modal */}
        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
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

        <Modal
          show={this.state.showCaptionModal}
          onHide={() => this.setState({ showCaptionModal: false })}
          size="lg"
          centered
        >
          <Modal.Body className="d-flex p-0">
            <div className="w-50">
              <div>
                <Button variant="secondary" onClick={this.handleBack}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  className="position-absolute top-0 end-0 m-2"
                  onClick={this.handleshare}
                  style={{zIndex:1}}s
                >
                  Share
                </Button>
              </div>

              <img
                src={this.state.selectedImage}
                alt="preview"
                className="img-fluid h-100 w-100"
                style={{ objectFit: "cover", borderRight: "1px solid #ddd" }}
              />
            </div>
            <div className="w-50 p-3 position-relative d-flex flex-column">
              <h5 className="mb-3">Add a caption</h5>
              <textarea
                className="from-control flex-grow-1"
                placeholder="this is the image"
                value={this.state.captionText}
                onChange={(e) => this.setState({ captionText: e.target.value })}
                style={{ resize: "none" }}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
