import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Main} from "./Main/Main";
import {Result} from "./Result/Result";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );;
}

export default App;
