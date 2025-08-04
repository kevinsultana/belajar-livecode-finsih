import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import AddProductPage from "./pages/AddProductPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit-product/:id" element={<EditPage />} />
        <Route path="/add-new" element={<AddProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}
