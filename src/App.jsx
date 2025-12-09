import React ,{useEffect, useLayoutEffect, useState} from 'react'
import {  Routes, Route } from 'react-router'
import Main from './Components/Main'
import Panel from './Components/Panel/Panel'
import Login from './Components/Login'
import BlogPost from './Components/Blog/blogPost'
import { Adminchk } from './Components/Protectedroutes'
// import { useLocation } from 'react-router';
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';


const App = () => {
  // const location = useLocation();

  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
      // Force hard reload (bypasses React hydration)
      window.location.href = window.location.href;
    }
  }, []);

  // useEffect(() => {
  //   NProgress.start();
  //   // Simulate route load or wait for real loading to finish
  //   setTimeout(() => {
  //     NProgress.done();
  //   }, 300); // adjust time based on your actual load
  // }, [location.pathname]);
  return (
    <div  >
        <Routes>
          <Route path="/" element={
            <Main   />
          } />
          <Route path="/Login" element={
            <Login />
          } />
          <Route path="/Panel" element={
            <Adminchk />
          } />
          <Route path="/blog/:title" element={<BlogPost />} />  {/* ← Use BlogPost */}
        </Routes>




    </div>
  )
}

export default App
