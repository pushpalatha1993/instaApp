import React, { Component } from 'react'
import "./style.css"
import { Link } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import {withRouter} from './withRouter';
import {Modal,button} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

 class Login extends Component {

    // const [email, setEmail] = useState();
    // const [password, stePassword] = useState();
    constructor(props){
        super(props);
        this.state = {
            email:" ",
            password:"",
            errorMessage:" ",
            successMessage:" ",
            showToast:false,
            toastMessage:"",
            toastType:"success ",
            disableLoginBtn:false,
            showModal:false,
            loading:false,
            error:'',
            token:null,
            redirectToHome: false,

        }
    }
    componentDidMount(){
        const token = localStorage.getItem('token')
        console.log('Token from localStorage:',token)
        if(token) {
            this.setState({redirectToHome:true})
             this.props.navigate('/home')
         }
       
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
    const {email, password } =this.state;
    return email.trim() !==''&& password.trim() !== '';
 }
 handleSubmit = (event) => {
    console.dir(this.state)
    event.preventDefault()
    console.dir(this.props)
this.setState({showModal: true})
 }

handleToastClose = () => {
        // console.log("handle")
        this.setState({showToast: false})
     }
     
     handleOk = () => {
        const {email,password} = this.state;
        this.setState({showModal: false,loading:true,error:''})

        fetch("https://instaapp-np7g.onrender.com/api/auth/login",{
            method: "POST",
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify({email:this.state.email,password:this.state.password}),
        })
        .then((response) => response.json())
        .then((data)=>{
            // console.log("responsedata")
            // console.dir(data)
            if(data){
                if(data){
                    
                    localStorage.setItem("token",data.token)
                }
                this.setState({successMessage:"Login successful",showToast:"true",toastMessage:data.message,toastType:"succesful"})
                setTimeout(()=>{
                    this.props.navigate('/home')
    
                },5000)
            }
        })
        .catch((error) => {
            this.setState({ 
                showToast: true,
                toastMessage: 'Login Failed! please try again ',
                toastType:'danger',
            })
          })
     }
     handleCancel  = () => {
        this.setState({showModal:false})
     }
    
        

render () {

    console.log(this.state)
    console.log(this.props)
    
    
    if (this.state.redirectToHome) {
        return <Navigate to="/Home" />
      }
    const {showToast, toastMessage,toastType,toggleShow,withRouter,isFormValid,showModal,token} = this.state.email && this.state.password
    const isEnabled = this.isFormValid();
    
     return (
       
    <div className="row g-0 vh-100 justify-content-center align-items-center login-container">
        

        <div className="col-10 row g-0 align-items-center border rounded-2 bg-white">
            <div className="d-none d-md-block col-6">
                <img src="https://img.freepik.com/premium-vector/small-island_645480-1472.jpg?w=826" alt="" className='img-fluid' />
            </div>
            <form className="col-12 col-md-6 py-4 px-3">
                <h4 className="login-title text-center py-2 mb-4">Login</h4>
                <div className="form-floating mb-3">
                    <input type="email"  name="email" className="form-control" id="email" placeholder='name@example.com' value={this.state.email} onChange={this.handleChange } />
                    <label htmlFor="email">Email</label>
                </div>


                <div className="form-floating mb-3">
                    <input type="password"  name="password" className="form-control" placeholder="password" id="password"  value={this.state.password} onChange={this.handleChange} />
                    <label htmlFor="password">Password</label>

                </div>
                <div className="text-center">

                    <button className="login-btn py-3 rounded-3" type="Login" disabled={!isEnabled} onClick={this.handleSubmit}>
                        Login
                    </button>
                </div>

                <div className="text-center mt-4"> Not registered ?<Link to="/signup">Sign Up</Link>


                </div>
             </form>
             {this.state.errorMessage && <p style={{color:'red'}}>{this.state.errorMessage}</p>}
             {this.state.successMessage && <p style={{color:'green'}}>{this.state.successMessage}</p>}

              <ToastContainer position="top-end" className="custom-toast" >
                <Toast
                show={this.state.showToast}
                onClose={this.handleToastClose}
                bg={this.state.toastType}
                delay={3000}
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
                <div className='modal-content'>
                <p>Please verify fields before processing</p>
                    <button onClick={this.handleCancel}>Cancle</button>
                    
                    <button onClick={this.handleOk}>Ok</button>

                </div>

            </div>
         )}
    </div> 
)}
 

   
}
export default withRouter(Login);