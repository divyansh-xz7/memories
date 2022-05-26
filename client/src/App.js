import React, { useEffect, useState } from 'react';
import {Container} from "@material-ui/core";

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

export default function App() {
  const [user,setUser]= useState(JSON.parse(localStorage.getItem('profile')));

  const CheckUser=()=>{
    setUser(JSON.parse(localStorage.getItem('profile')));
    if(user)
    return <Navigate replace to='/posts'/>
    return <Auth/>
  };
  return (
    <BrowserRouter>
    <Container maxidth="xl">
    <Navbar/>
      <Routes>
        <Route path='/' element={<Navigate replace to='/posts'/>}/>
        <Route path='/auth' element={<CheckUser/>}/>
        <Route path='/posts' element={<Home/>}/>
        <Route path='/posts/search' element={<Home/>}/>
        <Route path='/posts/:id' element={<PostDetails/>}/>
      </Routes>
    </Container>
    </BrowserRouter>
  )
}
