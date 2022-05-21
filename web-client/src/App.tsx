import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes, useNavigate, Outlet} from 'react-router-dom';
import {Main} from "./Main/Main";
import {Result} from "./Result/Result";
import {Search} from "./Search/Search";
import {useUser} from "./SWRHooks/useUser";
import {RegisterWrapper} from "./Authentication/Register";
import {LoginWrapper} from "./Authentication/Login";
import {ProjectList} from "./Project/ProjectList";
import {Project} from "./Project/Project";


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
      <Route path="project" element={<Outlet/>}>
        <Route index element={<ProjectList/>}/>
        <Route path=":projectId" element={<Project />}/>
      </Route>
    </Routes>
  )
}

export default App;
