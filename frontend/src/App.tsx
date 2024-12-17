import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Admin from "./Admin";
import Form from "./Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
