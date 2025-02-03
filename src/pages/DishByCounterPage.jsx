import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDishByCounter } from "../slices/DishSlice"

const DishByCounterPage = () => {
  const { counterId } = useParams(); 
  const dispatch = useDispatch();
  const { dishes, loading, error } = useSelector((state) => state.dish);
  const cartDishIds = useSelector((state) => state.cart.cartItems.map(item => item.dish._id));
  

  useEffect(() => {
    dispatch(fetchDishByCounter(counterId)); 
  }, [counterId, dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 mb-10">
      {dishes.length === 0 ? (
        <div className="text-center text-lg text-gray-500">No dishes available.</div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {dishes.map((dish) => (
        <li
          key={dish._id}
          className="bg-white focus:ring-[#faf0e6] p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105"
        >
          <div className="flex flex-col items-center text-center">
            <img
              src={dish.imageUrl || "/placeholder.jpg"}
              alt={dish.name}
              className="w-full h-50 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{dish.name}</h3>
            <p className="text-gray-600 mt-2">Price: ₹{dish.price}</p>
            <p className="text-gray-500 mt-2 text-sm">{dish.description}</p>
            <p className="text-gray-600 mt-2">Stock: {dish.stock}</p>
          </div>
          {cartDishIds.includes(dish._id) ? (
            <button className="w-full mt-4 bg-gray-400 text-white py-2 px-6 rounded-md cursor-not-allowed">
              Added to Cart!
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart(dish)}
              className="w-full mt-4 bg-[#505e4b] text-white py-2 px-6 rounded-md focus:outline-none"
            >
              Add to Cart
            </button>
          )}
          <button
            onClick={() => handleEditDish(dish)}
            className="w-full mt-4 bg-[#505e4b] text-white py-2 px-6 rounded-md focus:outline-none"
          >
            Edit Dish
          </button>
        </li>
      ))}

        </ul>
      )}
    </div>
  );
};

export default DishByCounterPage;
