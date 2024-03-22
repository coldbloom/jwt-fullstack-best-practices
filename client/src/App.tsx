import React from 'react';
import './App.css';
import {Routes, Route, Navigate, Link} from 'react-router-dom'

import Demo from "./pages/Demo";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Nav from "./components/Nav";

function App() {
  return (
      <div className="App">
          <Nav />
          <Routes>
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="demo" element={<Demo />} />
              <Route path="*" element={<Navigate to={"sign-in"}/>} />
          </Routes>
      </div>
  );
}

export default App;
