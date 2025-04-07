import React, { Component } from 'react'
import "./style.css"
import { Link } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import {withRouter} from './withRouter'
 class Login extends Component {


    // const [email, setEmail] = useState();
    // const [password, stePassword] = useState();
    constructor(props){
        super(props);
        this.state = {
            email:" ",
            password:" ",
            errorMessage:" ",
            successMessage:" ",
            showToast:false,
            toastMessage:"",
            toastType:"success "

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
 handleSubmit = (event) => {
    console.dir(this.state)
    event.preventDefault()
    console.dir(this.props)
    // this.props.routers.navigate('/home');
    this.props.routers.navigate('/Home')
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
            this.setState({successMessage:"Login successful",showToast:"true",toastMessage:data.message,toastType:"succesful"})
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

          handleLogin = () => {
        alert("Login successful")
        // this.props.history.push("/home")
    }
    
    handleToastClose = () => {
        console.log("handle")
        this.setState({showToast: false})
     }

render () {

    console.log(this.state)
    console.log(this.state.email)
    console.log(!this.state.email)
    
    

    const {showToast, toastMessage,toastType,toggleShow,withRouter} = this.state;
     return (
    <div className="row g-0 vh-100 justify-content-center align-items-center login-container">

        <div className="col-10 row g-0 align-items-center border rounded-2 bg-white">
            <div className="d-none d-md-block col-6">
                <img src="https://img.freepik.com/premium-vector/small-island_645480-1472.jpg?w=826" alt="" className='img-fluid' />
            </div>
            <form className="col-12 col-md-6 py-4 px-3">
                <h4 className="login-title text-center py-2 mb-4">Login</h4>
                <div className="form-floating mb-3">
                    <input type="email"  name="email" className="form-control" id="email" placeholder='name@example.com' onChange={this.handleChange } />
                    <label htmlFor="email">Email</label>
                </div>


                <div className="form-floating mb-3">
                    <input type="password"  name="password" className="form-control" placeholder='password' id="password" onChange={this.handleChange} />
                    <label htmlFor="password">password</label>

                </div>
                <div className="text-center">

                    <button className="login-btn py-3 rounded-3"  onClick={this.handleSubmit}>
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
    </div>
)}

   
}
export default withRouter(Login);