import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import CounterPage from "./pages/CounterPage";
import DishPage from "./pages/DishPage";
import Carousel from "./components/Carousel";
import './index.css'; 
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<><Carousel /><HomePage/></>} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/counters" element={<CounterPage />} />
            <Route path="/dishes" element={<DishPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
