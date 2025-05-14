import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./auth/Navbar";
import CreatePost from "./Post/Createpost"; 
import "./auth/login/style.css";
import Getpost from "./Post/Getpost";



export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      newPostAdded: false,
      showCreateModal:false,
    }
  }
  componentDidMount(prevprops) {
    const username = localStorage.getItem("name")
    this.setState({username: username});
    if(!username) {
      
      this.setState({isLoggedOut:true});
    }
  }
  handleNewPost = () => {
    this.setState({newPostAdded:true});
  }
  resetPostAdded = () => {
    this.setState({newPostAdded: false})
  }
  handleShowCreateModal = () => {
    this.setState({showCreateModal:true});
  }
  handleCloseCreateModal = ()=> {
    this.setState({showCreateModal:false})
  }
  

   render() {
     
   return (
      <div>
        <Navbar username={this.state.username} handleLoggedout={this.handleLoggedout} onPostCreate={this.handleNewPost} onCreateClick={this.handleShowCreateModal}/>
        {/* <div className="home-container">
          <h1>Home Page</h1>
          <p>You are logged in</p>
        </div> */}
        <CreatePost onPostCreated={this.handleNewPost}  showModal={this.state.showCreateModal}
        handleClose={this.handleCloseCreateModal} />
        <Getpost newPostAdded={this.state.newPostAdded}  resetPostAdded={this.resetPostAdded}/>
        


      </div>
      
    );
  }
}
