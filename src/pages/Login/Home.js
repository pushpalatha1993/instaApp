import React,{Component} from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FiPlus } from "react-icons/fi";
import { Button, Modal } from "react-bootstrap";


export default class Home extends Component {
     constructor(props) {
        super(props);
        this.state = {
            isLoggedOut:false, 
           username:"",
           showModal: false,
           file: null
        }
     }

     componentDidMount() {
        const token = localStorage.getItem("token")
        const storedUsername = localStorage.getItem("name")
        this.setState({username:storedUsername})

        if(!token) {
            this.setState({isLoggedOut:true})
          }
         
     }
     handleCreateClick= () => {
        alert("create button clicked!")
    }
    handleLoggedout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('data')
        localStorage.removeItem("username")
        localStorage.clear();
        window.location.href="/"
        // console.log("LoggedOut,token removed.")
        this.setState({isLoggedOut:true})
        

    }
    handleShow = () => {
        this.setState({showModal:true})
    }
    handleClose = () => {
        this.setState({showModal:false,file:null})
    }
    handleFileChange = (e) => {this.setState({file:e.target.files[0]})
    }
    handleUploade = () => {
        if(this.state.file) {
            console.log("Uploading file:", this.state.file)
        }
        this.handleClose()
    }
   

    render() {
        if(this.state.isLoggedOut){
            return<Navigate to ='/login' />
            // <p> welcome {this.state.username||'user'}</p>
        }
        return(
            <div>
                <Navbar username={this.state.username}/>
                <div className="home-container">
                <h1>Home Page</h1>
                <p >You are logged in. {this.state.username}</p>
                <button onClick={this.handleLoggedout} className="btn btn-danger mt-3">
                    Logout
                    </button>
            </div>
            <div className="text-center mt-4">
                <img
                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sketchappsources.com%2Ffree-source%2F2668-instagram-home-view-ios-sketch-freebie-resource.html&psig=AOvVaw3FNmTk24W9eRT13tfXQODx&ust=1744911148957000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiTwt2K3YwDFQAAAAAdAAAAABAE"
                // alt="welcome"
                className="img-fluid rounded"
                style={{maxWidth:'90%',height:'auto'}}
                />

            </div>
            <div>
            <button variant="primary" className="d-inline-flex align-items-center" onClick={this.handleShow}>
               <FiPlus className="me-2"/>
               Create
            </button>
            
            <Modal show={this.state.showModal} onHide={this.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="border p-4 mb-3"
                    style={{borderStyle: 'dashed',textAlign: 'center',backgroundColor: '#f8f9fa', borderColor:"#ccc", borderWidth:'2px'}}
                    >
                        <p>Drage and Drop your file here</p>
                        <p>or</p>
                        <input 
                        type="file"
                            onChange={this.handleFileChange}
                            className="form-control"
                            />
                            {this.state.file && <p className="mt-2 text-success">Selected:{this.state.file.name}</p>}

                     </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={this.handleClose}>
                        Cancel
                         </button>
                         <button className="btn btn-primary" onClick={this.handleUpload}>
                            Upload

                         </button>
                </Modal.Footer>

            </Modal>
            </div>
            </div>

            
           
        )
    }
}