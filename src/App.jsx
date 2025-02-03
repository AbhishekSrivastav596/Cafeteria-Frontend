import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import CounterPage from "./pages/CounterPage";
import DishPage from "./pages/DishPage";
import Carousel from "./components/Carousel";
import './index.css'; 
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./slices/CartSlice";
import DishByCounterPage from "./pages/DishByCounterPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  
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
            <Route path="/dishes/:counterId" element={<DishByCounterPage/>} />
          </Routes>
        </main>
        <Footer />
       <ScrollToTop/>

      </div>
    </Router>
  );
}

export default App;
