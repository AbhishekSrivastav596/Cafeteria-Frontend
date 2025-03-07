import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../slices/CartSlice";
import CartSkeleton from "../components/CartSkeleton";

function CartPage() {
  const dispatch = useDispatch();
  const { cartItems = [], loading } = useSelector((state) => state.cart);

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
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.dish.price * item.quantity,
    0
  );

  if (loading) {
    return <CartSkeleton />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-500">
          Your cart is empty.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-lg font-semibold">Total Items: {totalQuantity}</p>
        <p className="text-lg font-semibold">
          Total Price: ₹{totalPrice.toFixed(2)}
        </p>
      </div>
      <button
        onClick={handleClearCart}
        className="w-full md:w-auto bg-[#404D3C] text-white py-2 px-6 rounded-md hover:bg-[#505e4b] focus:outline-none focus:ring-2 focus:ring-[#404D3C] mb-6"
      >
        Clear Cart
      </button>
      <ul className="space-y-6">
        {cartItems.map((item, index) => (
          <li
            key={`${item.dish._id}-${index}`}
            className="bg-white transition duration-300 hover:scale-101 focus:ring-[#faf0e6] p-6 rounded-lg shadow-lg hover:shadow-xl border-1 border-[#2d2d2d] flex flex-col md:flex-row justify-between items-center"
          >
            <div className="flex flex-col md:flex-row items-center">
              <img
                src={item.dish.imageUrl || "/placeholder.jpg"}
                alt={item.dish.name}
                className="w-24 h-30 md:w-32 md:h-32 object-cover rounded-lg mb-4 md:mb-0"
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
                className="bg-[#9ba174] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#404D3C] hover:bg-[#7c8b56] border-2 border-[#2d2d2d]"
              >
                Increase
              </button>
              <button
                onClick={() => handleDecreaseQuantity(item.dish._id)}
                className="bg-[#505e4b] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#404D3C] hover:bg-[#3f4b3b] border-2 border-[#2d2d2d]"
              >
                Decrease
              </button>
              <button
                onClick={() => handleRemoveFromCart(item.dish._id)}
                className="bg-[#d64d4d] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#404D3C] hover:bg-[#a83838] border-2 border-[#2d2d2d]"
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
