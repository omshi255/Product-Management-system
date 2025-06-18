
import './App.css'
import Signup from './signup/Signup.jsx'
import Login from './login/Login.jsx'
import Logout from './logout/Logout.jsx'
   import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductCRUD from './ProductListing/CRUDproduct.jsx';
import Register from './signup/Signup.jsx';
import Navbar from './component/Navbar.jsx';
function App() {


  return (
    <>
 
   
    <Navbar/>
    {/* <Logout/> */}
    {/* <Signup/>
    <Login/> */}
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login/>} />
        <Route path="/product" element={<ProductCRUD />} />
        {/* <Route path="/dashboard" element={<CRUDproduct />} /> */}
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
