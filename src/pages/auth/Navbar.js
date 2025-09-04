import React,{Component} from "react";
import CreatePost from "../Post/Createpost";
// import "./styles.css";
import { FiPlus } from "react-icons/fi";

export default class Navbar extends Component {
    render() {
        const {username, handleLoggedout,onPostCreated} = this.props;
        return(
           
           <div className="navbar-custom"> 
           <span className="navbar-title">Welcome {this.props.username} </span>
           
           <div>
                     <button
                       variant="primary"
                       className="d-inline-flex align-items-center"
                       style={{top:"10px",left:"10px"}}
                       onClick={this.props.onCreateClick}
                     >
                       <FiPlus className="me-2" />
                       Create
                     </button>
                   </div>
           <button onClick={this.props.handleLoggedout} className="btn btn-danger ">
                    Logout
                    </button>
                    
           </div>
           
        )
    }
}