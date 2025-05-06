import logo from './logo.svg';
import React ,{Component} from 'react';
import './App.css';
import Context from './Context';
import Home from './pages/Home';
import Login from './pages/auth/login';
import SignUp from './pages/auth/SignUp';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


class App extends Component {
  // console.log(props)
  constructor(props) {
    super(props);
    this.state = {
      userId:  "",
    }
  }
  handleLoginSuccess = (userId) => {
    console.log(userId)
   this.setState({userId});
   
  }
  render() {
    return (
      <BrowserRouter>
       <Routes>
         <Route path='/login' element={<Login  onLoginSuccess={this.handleLoginSuccess}/>}/>
        <Route path='/signup' element={<SignUp name="from App"/>}/>
       <Route path='/' element={<h1>No page found</h1>}/>
       <Route path='/home' element={<Home userId={this.state.userId}/>}/>
       </Routes>
       <ToastContainer autoClose={3000}/>
      </BrowserRouter>

      // <div className="App">
        
        // {/* <Home name="latha"/> */}
        
      // </div>
       )
  }
  
 
}

export default App;
 