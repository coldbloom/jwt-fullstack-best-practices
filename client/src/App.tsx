import { useContext } from 'react';
import { AuthContext } from "./context/AuthContext";
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'

import Demo from "./pages/Demo";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Nav from "./components/Nav";

import { SnackbarProvider } from "notistack";

function App() {
  const { isUserLogged } = useContext(AuthContext);

  return (
    <div className="App">
      <SnackbarProvider>
        <Nav />
        <Routes>
          {isUserLogged ? (
            <Route path="demo" element={<Demo />} />
          ) : (
            <>
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
            </>
          )}
          <Route path="*" element={<Navigate to={isUserLogged ? "demo" : "sign-in"} />} />
        </Routes>
      </SnackbarProvider>
    </div>
  );
}

export default App;
