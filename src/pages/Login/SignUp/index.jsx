import React, {Component} from "react";
import "./style.css"
import { Link, Navigate } from 'react-router-dom';
import { Button, Toast,ToastContainer} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";
import {withRouter} from "../withRouter"
import { Modal,button } from "react-bootstrap";
// import { Navigate } from "react-router-dom";
 class  SignUp extends Component {
    
   constructor(props){
        super(props);
        this.state = {
            name:  " ",
            email: " ",
            password: "",
            errorMessage: " ",
            successMessage:" ",
            showToast:false,
            toastMessage:"",
            toastType:"success",
            value:" ",
            disabledSignupBtn:false,
            showModal:false,
            loading:false,
            error:'',
            token:null,
            redirectToHome: false,
             }
    }
    componentDidMount() {
        const token = localStorage.getItem('token')
        if (token) {
            this.setState({redirectToHome:true})
            this.props.navigate('/home')
         }
    }
    txtChange(e) {
        this.setState({input: e.target.value});
    }
       showToast = ()=> {
        toast("this is a custom-styled toast!",{
            className: "custom-toast",
            position: "top-right",
            autoClose:4000
        })
       }


    handleChange = (event) => {
        // console.log(event.target.name,event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    isFormValid = () => {
        const {name,email,password } = this.state;
        // console.log(name)
        // console.log(email)
        // console.log(password)
        return name.trim() !== '' && email.trim() !== '' && password.trim() !== ''
    }

    handleSubmit = (event) => {
        // console.dir(this.state)
        event.preventDefault()
        this.setState({ showModal:true});
       
       
       
       
    }

    handleToastClose = () => {
        console.log("handle")
        this.setState({showToast: false})
    }
    handleOk =()=>{
        const {name,email,password} = this.state
        this.setState({showModal:false,loading:true,error:''})

         fetch(" https://instaapp-np7g.onrender.com/api/auth/register/email ",{           
            method: "POST",
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({name:this.state.name,email:this.state.email,password:this.state.password}),
      })
       .then((response) => response.json())
       .then((data)=>{
        console.log("responsedata")
        console.dir(data)
        if(data){
            console.log(data.message)
            if(data.token){
                localStorage.setItem("token",data.token)
                setTimeout(()=>{
                    this.props.navigate('/Login')
    
                },
                5000)
            }
            this.setState({successMessage: "signup successful",showToast:"true",toastMessage:data.message,toastType:"successful"})
            // console.log(this.props)
           
              }
             })
        .catch((error) => {
        console.dir(error)
        this.setState({
            showToast: true,
            toastMessage : 'Signup Failed! Please try again',
            toastType: 'danger',
        })

       })
    }
    handleCancel = ()=>{
        this.setState({showModal:false})
    }

 render () {
    console.log(this.props)
    // console.log(this.state)
    if(this.state.redirectToHome){
        return<Navigate to ="/Home"/>
    }
    const {showToast, token,toastMessage, toastType,toggleShow,isFormValid,showModal} = this.state.name && this.state.email && this.state.password;
    const isEnabled = this.isFormValid();
    console.log(this.state.toastMessage)

     return (
    <div className="row g-0 vh-100 justify-content-center align-items-center SignUp-container">

        <div className="col-10 row g-0 align-items-center border rounded-2 bg-white">
            <div className="d-none d-md-block col-6">
                <img src="https://img.freepik.com/free-vector/lost-island-ocean-with-alone-castaway-person_107791-621.jpg?t=st=1742302383~exp=1742305983~hmac=1099f3747d8fa6374232a7150518acac4042b6b43c3bc1975f28f7042691edf4&w=826" alt="" className='img-fluid' />
            </div>
            <form className="col-12 col-md-6 py-4 px-3">
                <h4 className="SignUp-title text-center py-2 mb-4">SignUp</h4>
                <div className="form-floating mb-3">
                    <input type="text" name="name" className="form-control" id="name" value={this.state.name} placeholder="codediggy" onChange={ this.handleChange} />
                    <label htmlFor="name">name</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="email" name="email" className="form-control" id="email"value={this.state.email} placeholder='name@example.com' onChange={this.handleChange} />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" name="password" className="form-control" value={this.state.password} placeholder='password' id="password" onChange={this.handleChange} />
                    <label htmlFor="password">password</label>

                </div>
                <div className="text-center">
                    <button className="signup-btn py-3 rounded-3" disabled={!isEnabled} onClick={this.handleSubmit}>
                        SignUp
                    </button>
                </div>

                <div className="text-center mt-4">  Already Registered ? <Link to="/login">Login</Link>
                </div>

            </form>
            {this.state.errorMessage && <p style = {{color:'red'}}>{this.state.errorMessage}</p>}
        
            {this.state.successMessage && <p style = {{color:'green'}}>{this.state.successMessage}</p>}

            <ToastContainer position ="top-end" className="custom-toast" >
            <Toast
            show={this.state.showToast}
            onClose={this.handleToastClose}
            bg={this.state.toastType}
            delay={3000}
            autohide
             >
                <button onClick={this.handleToastClose} className="btn">
                X
                </button>
                
                <Toast.Body>{this.state.toastMessage}</Toast.Body>

            </Toast>
            
           </ToastContainer> 

        </div>
        {this.state.showModal && (
            <div className='modal'>
                <div className='model-content'>
                    <p>Please verify fields before processing</p>
                    <button onClick={this.handleCancel}>Cancel</button>
                    <button onClick={this.handleOk}>Ok</button>
                </div>
            </div>
        )}
    </div>
)}
   
}

export default withRouter(SignUp);