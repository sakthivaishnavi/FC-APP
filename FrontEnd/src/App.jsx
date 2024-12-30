import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLogin from './pages/Admin/AdminLogin';
import Cart from './pages/Cart';
import ContactUs from './pages/ContactUs';
import Hero from './pages/Hero';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Home from './pages/Admin/Home';
import Welcome from './components/Welcome';
import axios from 'axios';
import bg from './assets/hd.png'
import contactbg from './assets/bg.png'

import OrderList from './pages/Admin/OrderList';
import Token from './pages/Token';
function App() {
  
    return (
    <Router>
      <Routes>
      <Route path="/" element={
        <div style={{ backgroundImage: `url(${bg})`,
         backgroundSize: 'cover', backgroundPosition:'center',
         backgroundAttachment:'fixed', backgroundRepeat:'no-repeat',
          minHeight: '100vh', width:'100%', height:'100%'}}>
        <Welcome />
        </div>
      } />
      <Route path="/home" element={<Hero />   
  } />
      <Route path="/cart" element={       
        <Cart />
        } />
      <Route path="/register" element={
        <div style={{ backgroundImage: `url(${bg})`,
        backgroundSize: 'cover', backgroundPosition:'center',
        backgroundAttachment:'fixed', backgroundRepeat:'no-repeat',
         minHeight: '100vh', width:'100%', height:'100%'}}>
        <UserRegister />
        </div>
      } />
      <Route path="/userLogin" element={
        <div style={{ backgroundImage: `url(${bg})`,
        backgroundSize: 'cover', backgroundPosition:'center',
        backgroundAttachment:'fixed', backgroundRepeat:'no-repeat',
         minHeight: '100vh', width:'100%', height:'100%'}}>
        <UserLogin />
        </div>
        } />
      <Route path="/adminLogin" element={
        <div style={{ backgroundImage: `url(${bg})`,
        backgroundSize: 'cover', backgroundPosition:'center',
        backgroundAttachment:'fixed', backgroundRepeat:'no-repeat',
         minHeight: '100vh', width:'100%', height:'100%'}}>
        <AdminLogin />
        </div>
        } />
      <Route path="/contactUs" element={
        <div style={{ backgroundImage: `url(${contactbg})`,
        backgroundSize: 'cover', backgroundPosition:'center',
        backgroundAttachment:'fixed', backgroundRepeat:'no-repeat',
         minHeight: '100vh', width:'100%', height:'100%'}}>
         <ContactUs />
        </div>
      } />
      <Route path='/admin' element={
        <div style={{backgroundColor: '#F0F4F1', minHeight: '100vh', width:'100%', height:'100%'}} ><Home />  </div>} />

      <Route path='/orderList' element={<OrderList/>} />
      
      <Route path='/token' element={<Token/>} />
      </Routes>
    </Router>
    );
}

export default App;