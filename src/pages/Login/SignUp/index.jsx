import React, { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom';
export default function SignUp() {


    const [email, setEmail] = useState();
    const [password, stePassword] = useState();
    const [username, setUsername] = useState();

    const handleSignUp = () => {
        alert("Sign Up successful")
    }



    return (
        <div className="row g-0 vh-100 justify-content-center align-items-center SignUp-container">

            <div className="col-10 row g-0 align-items-center border rounded-2 bg-white">
                <div className="d-none d-md-block col-6">
                    <img src="https://img.freepik.com/free-vector/lost-island-ocean-with-alone-castaway-person_107791-621.jpg?t=st=1742302383~exp=1742305983~hmac=1099f3747d8fa6374232a7150518acac4042b6b43c3bc1975f28f7042691edf4&w=826" alt="" className='img-fluid' />
                </div>
                <form className="col-12 col-md-6 py-4 px-3">
                    <h4 className="SignUp-title text-center py-2 mb-4">SignUp</h4>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="username" placeholder="codediggy" onChange={(e) => { setEmail(e.target.value) }} />
                        <label htmlFor="username">Username</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" placeholder='name@example.com' onChange={(e) => { setEmail(e.target.value) }} />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" placeholder='password' id="password" onChange={(e) => { stePassword(e.target.value) }} />
                        <label htmlFor="password">password</label>

                    </div>
                    <div className="text-center">
                        <button className="signup-btn py-3 rounded-3 onClick={()=>{handleLogin()}}">
                            SignUp
                        </button>
                    </div>

                    <div className="text-center mt-4">  Already Registered ? <Link to="/login">Login</Link>


                    </div>





                </form>



            </div>
        </div>
    )
}