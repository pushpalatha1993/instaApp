import React,{Component} from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";

export default class Home extends Component {
     constructor(props) {
        super(props);
        this.state = {
            isLoggedOut:false, 
           username:""
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
    handleLoggedout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('data')
        localStorage.removeItem("username")
        // console.log("LoggedOut,token removed.")
        this.setState({isLoggedOut:true})
        

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
            </div>
           
        )
    }
}