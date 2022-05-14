import React, {Suspense} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import {Main} from "./Main/Main";
import {Result} from "./Result/Result";
import {Search} from "./Search/Search";
import {useUser} from "./SWRHooks/useUser";
import {ErrorBoundary} from "react-error-boundary";
import {RegisterWrapper} from "./Authentication/Register";
import {LoginWrapper} from "./Authentication/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginWrapper/>}/>
        <Route path="register" element={<RegisterWrapper/>}/>
        <Route path="*" element={<UserPageRoutesWrapper/>}/>
      </Routes>
    </BrowserRouter>
  );
}

function UserPageRoutesWrapper() {
  return (
    <UserPageRoutes/>
  )
}

function UserPageRoutes() {
  const navigate = useNavigate();
  console.log('useUser navigate');
  const {user, error, mutate} = useUser({suspense: false});
  if (!user && !error) {
    return <>'Loading...'</>
  }
  if (error) {
    navigate('/login');
  }

  return (
    <Routes>
      <Route path="*" element={<Main/>}/>
      <Route path="result" element={<Result/>}/>
      <Route path="search" element={<Search/>}/>
    </Routes>
  )
}

export default App;
