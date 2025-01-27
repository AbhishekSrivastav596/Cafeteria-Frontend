import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../slices/CartSlice';

function CartPage() {
  const dispatch = useDispatch();
  const { cartItems = [] } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  
  const handleIncreaseQuantity = (dishId) => {
    dispatch(increaseQuantity(dishId));  
  };


  const handleDecreaseQuantity = (dishId) => {
    dispatch(decreaseQuantity(dishId));  
  };


  const handleRemoveFromCart = (dishId) => {
    dispatch(removeFromCart(dishId));  
  };

  const handleClearCart = () => {
    dispatch(clearCart()); 
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);

 
  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-500">Your cart is empty.</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-lg font-semibold">Total Items: {totalQuantity}</p>
        <p className="text-lg font-semibold">Total Price: ₹{totalPrice.toFixed(2)}</p>
      </div>
      <button
        onClick={handleClearCart}
        className="w-full md:w-auto bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 mb-6"
      >
        Clear Cart
      </button>
      <ul className="space-y-6">
  {cartItems.map((item, index) => (
    <li
      key={`${item.dish._id}-${index}`} // Combines dish ID with index
      className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center"
    >
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={item.dish.imageUrl || "/placeholder.jpg"}
          alt={item.dish.name}
          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg mb-4 md:mb-0"
        />
        <div className="ml-4 text-center md:text-left">
          <h3 className="text-xl font-semibold text-gray-800">
            {item.dish.name}
          </h3>
          <p className="text-gray-600">Price: ₹{item.dish.price}</p>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
          <p className="text-gray-800 font-semibold">
            Total: ₹{(item.dish.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex space-x-4">
        <button
          onClick={() => handleIncreaseQuantity(item.dish._id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Increase
        </button>
        <button
          onClick={() => handleDecreaseQuantity(item.dish._id)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Decrease
        </button>
        <button
          onClick={() => handleRemoveFromCart(item.dish._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Remove
        </button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
}

export default CartPage;
