import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { useSelector } from 'react-redux';
import { Menu } from './components/Menu';
import { Profile } from './components/Profile';
import { MyOrder } from './components/MyOrder';
import { Orders } from './components/Orders';
import { CreateMenuItem } from './components/CreateItem';

function App() {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  const protectedRoute = (Component) => {
    return isAuthenticated ? <Component /> : <Navigate to='/'/>;
  };

  return (
    <div className="App">
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path='login' element = {<Login />}/>
        <Route path='signup' element = {<Signup/>}/>
        <Route path="/home" element={protectedRoute(Home)}/>
        <Route path='/menu' element={protectedRoute(Menu)}/>
        <Route path='/profile' element={protectedRoute(Profile)}/>
        <Route path='/order/:id' element={protectedRoute(MyOrder)}/>
        <Route path='/orders' element={protectedRoute(Orders)}/>
        <Route path='/createMenuItem' element={protectedRoute(CreateMenuItem)}/>
      </Routes> 
    </div>
  );
}

export default App;
