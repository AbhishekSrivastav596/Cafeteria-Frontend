import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";

import CartPage from "./pages/CartPage";
import CounterPage from "./pages/CounterPage";
import DishPage from "./pages/DishPage";
import Carousel from "./components/Carousel";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/counters" element={<CounterPage />} />
        <Route path="/dishes" element={<DishPage />} />
      </Routes>
    <Carousel/>
    </Router>
  );
}

export default App;
