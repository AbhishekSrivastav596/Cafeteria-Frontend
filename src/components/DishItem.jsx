import React from "react";

function DishItem({ dish, onAddToCart, onEditDish, isInCart,showCounterName }){
  return (
    <li className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105">
      <div className="flex flex-col items-center">
        <img
          src={dish.imageUrl || "/placeholder.jpg"}
          alt={dish.name}
          className="w-full h-50 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-800 text-center">
          {dish.name}
        </h3>
        <p className="text-gray-600 mt-2 text-center">Price: ₹{dish.price}</p>
        <p className="text-gray-500 mt-2 text-center text-sm italic">
          {dish.description}
        </p>
        {showCounterName && (
          <p className="absolute top-3 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {dish.counter?.name || "Unknown Counter"}
          </p>
        )}
      </div>
      <button
        onClick={onAddToCart}
        className={`w-full mt-4 ${isInCart ? "bg-gray-400" : "bg-[#505e4b]"} text-white py-2 px-6 rounded-md`}
        disabled={isInCart}
      >
        {isInCart ? "Added to Cart!" : "Add to Cart"}
      </button>
      {onEditDish && (
        <button
          onClick={onEditDish}
          className="w-full mt-4 bg-[#505e4b] text-white py-2 px-6 rounded-md"
        >
          Edit Dish
        </button>
      )}
    </li>
  );
};

export default DishItem;
