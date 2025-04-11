import React,{Component} from "react";
import { Navigate } from "react-router-dom";

export default class Home extends Component {
     constructor(props) {
        super(props);
        this.state = {
            isLoggedOut:false
        }
     }
    handleLoggedout=()=>{
        localStorage.removeItem('token')
        console.log("LoggedOut,token removed.")
        this.setState({isLoggedOut:true})

    }

    render() {
        if(this.state.isLoggedOut){
            return<Navigate to ='/login' />
        }
        return(
            <div className="home-container">
                <h1>Home Page</h1>
                <p>Welcome User</p>
                <button onClick={this.handleLoggedout} className="btn btn-danger mt-3">
                    Logout
                    </button>
            </div>
        )
    }
}