import logo from './logo.svg';

import Login from './pages/Login';
import SignUp from './pages/Login/SignUp';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      {/* <Route path='/' element={<h1>No page found</h1>}/> */}
    </Routes>
    </BrowserRouter>
    
    
  )
}

export default App;
 