import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishes } from "../slices/DishSlice";
import { addDishes } from "../slices/DishSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pastaImage from "../assets/pasta.png";
import burgerImage from "../assets/burger.png";
import pizzaImage from "../assets/pizza.png";
import saladImage from "../assets/salad.png";

const dishImages = {
  "Pasta Alfredo": pastaImage,
  Burger: burgerImage,
  Pizza: pizzaImage,
  "Caesar Salad": saladImage,
};

function DishPage() {
  const dispatch = useDispatch();
  const { dishes, loading, error } = useSelector((state) => state.dish);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const handleAddToCart = (dish) => {
    const quantity = 1;
    dispatch(addDishes(dish._id, quantity));
    toast.success(`${dish.name} added to the cart!`, { autoClose: 2000 });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">
          Error: {error}
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Available Dishes</h1>
      {dishes.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No dishes available at the moment.
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <li
              key={dish._id}
              className="bg-white hover:bg-[#faf0e6] focus:ring-[#faf0e6] p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center">
                <img
                  src={dishImages[dish.name] || "/placeholder.jpg"}
                  alt={dish.name}
                  className="w-full h-50 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  {dish.name}
                </h3>
                <p className="text-gray-600 mt-2 text-center">
                  Price: ₹{dish.price}
                </p>
                <p className="text-gray-500 mt-2 text-center text-sm">
                  {dish.description}
                </p>
              </div>
              <button
                onClick={() => handleAddToCart(dish)}
                className="w-full mt-4 bg-[#404D3C] text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-[#404D3C]"
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default DishPage;
