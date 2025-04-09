import logo from './logo.svg';
import React from 'react';
import './App.css';
import Context from './Context';
import Home from './Component/curd';
import Login from './pages/Login';
import SignUp from './pages/Login/SignUp';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
// import Home from './pages/Login/Home';

function App(props) {
  console.log(props)
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/login' element={<Login name="from App" sname={props.fname}/>}/>
      <Route path='/signup' element={<SignUp name="from App"/>}/>
     <Route path='/' element={<h1>No page found</h1>}/>
     <Route path='/Home' element={<Home name="from App"/>}/>
     <Route path='/sigup' element={<SignUp />}/>
     <Route path ='/Login' element={<Login/>}/>
     </Routes>
    </BrowserRouter>
    // <div className="App">
      
      // {/* <Home name="latha"/> */}
      
    // </div>
     )
}

export default App;
 