import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Main} from "./Main/Main";
import {Result} from "./Result/Result";
import {Search} from "./Search/Search";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="result" element={<Result />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );;
}

export default App;
