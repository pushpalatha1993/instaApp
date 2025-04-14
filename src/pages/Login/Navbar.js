import React,{Component} from "react";
// import "./styles.css";

export default class Navbar extends Component {
    render() {
        const {username} = this.props;
        return(
           <div className="navbar-custom"> 
           <span className="navbar-title">Welcome {this.props.username}

           </span>
           </div>
        )
    }
}