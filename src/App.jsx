import React ,{useEffect, useLayoutEffect, useState, Suspense, lazy} from 'react'
import {  Routes, Route } from 'react-router'
import Main from './Components/Main'
const Panel = lazy(() => import('./Components/Panel/Panel'))
const Login = lazy(() => import('./Components/Login'))
const BlogPost = lazy(() => import('./Components/Blog/blogPost'))
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
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <Login />
            </Suspense>
          } />
          <Route path="/Panel" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <Adminchk />
            </Suspense>
          } />
          <Route path="/blog/:title" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <BlogPost />
            </Suspense>
          } />  {/* ← Use BlogPost */}
        </Routes>
    </div>
  )
}

export default App
