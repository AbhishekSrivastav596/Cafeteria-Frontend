import React from "react";

function DishItem({ dish, onAddToCart, onEditDish, isInCart,showCounterName }){
  return (
    <li className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:scale-105 border border-gray-800 flex flex-col overflow-hidden">
    <div className="flex flex-col items-center">
      <img
        src={dish.imageUrl || "/placeholder.jpg"}
        alt={dish.name}
        className="w-full h-48 object-cover rounded-t-2xl border-b border-gray-800 mb-4"
      />
      <h3 className="text-2xl font-semibold text-gray-900 text-center">{dish.name}</h3>
      <p className="text-gray-700 text-sm mt-1 text-center">Price: ₹{dish.price}</p>
      <p className="text-gray-600 mt-2 text-sm leading-relaxed italic font-bold text-center">{dish.description}</p>
      {showCounterName && (
        <p className="absolute top-3 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {dish.counter?.name || "Unknown Counter"}
        </p>
      )}
    </div>
    <div className="mt-4 flex justify-center space-x-4">
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
    </div>
  </li>
  
  );
};

export default DishItem;
