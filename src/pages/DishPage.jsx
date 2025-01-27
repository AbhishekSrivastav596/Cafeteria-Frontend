import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishes } from "../slices/DishSlice";
import { addToCart } from "../slices/CartSlice";

function DishPage() {
  const dispatch = useDispatch();
  const { dishes, loading, error } = useSelector((state) => state.dish);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const handleAddToCart = (dish) => {
    dispatch(addToCart(dish));
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
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center">
                <img
                  src={dish.imageUrl || "/placeholder.jpg"}
                  alt={dish.name}
                  className="w-32 h-32 object-cover rounded-lg mb-4"
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
                className="w-full mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DishPage;
