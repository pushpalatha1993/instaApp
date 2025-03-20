import React, { Component } from 'react'
import "./style.css"
import { Link } from 'react-router-dom';
export default class Login extends Component {


    // const [email, setEmail] = useState();
    // const [password, stePassword] = useState();
    constructor(props){
        super(props);
        this.state = {
            email:" ",
            password:" "

        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
 }
 handleSubmit = (event) => {
    event.preventDefault()
 }

    // const handleLogin = () => {
        // alert("Login successful")
    // }

render () { return (
    <div className="row g-0 vh-100 justify-content-center align-items-center login-container">

        <div className="col-10 row g-0 align-items-center border rounded-2 bg-white">
            <div className="d-none d-md-block col-6">
                <img src="https://img.freepik.com/premium-vector/small-island_645480-1472.jpg?w=826" alt="" className='img-fluid' />
            </div>
            <form className="col-12 col-md-6 py-4 px-3">
                <h4 className="login-title text-center py-2 mb-4">Login</h4>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder='name@example.com' onChange={this.handleChange } />
                    <label htmlFor="email">Email</label>
                </div>


                <div className="form-floating mb-3">
                    <input type="password" className="form-control" placeholder='password' id="password" onChange={this.handleChange} />
                    <label htmlFor="password">password</label>

                </div>
                <div className="text-center">
                    <button className="login-btn py-3 rounded-3" onClick={this.handleSubmit}>
                        Login
                    </button>
                </div>

                <div className="text-center mt-4"> Not registered ?<Link to="/signup">Sign Up</Link>


                </div>





            </form>










        </div>
    </div>
)}

   
}