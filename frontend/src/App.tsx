import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Admin from "./Admin";
import Form from "./Form";
import Data from "./Data";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
