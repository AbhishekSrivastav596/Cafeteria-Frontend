import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDishes, fetchDishes, addNewDish,fetchDishesSuccess } from "../slices/DishSlice";
import { addTocart } from "../slices/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function DishPage() {
  const dispatch = useDispatch();
  const { dishes, loading, error } = useSelector((state) => state.dish);
  const cartDishIds = useSelector((state) => state.cart.cartItems.map(item => item.dish._id));

  const [editingDish, setEditingDish] = useState(null);
  const [updatedDishData, setUpdatedDishData] = useState({
    name: "",
    description: "",
    price: "",
    stock: true,
    counter: "",
  });

  const [newDishData, setNewDishData] = useState({
    name: "",
    description: "",
    price: "",
    stock: true,
    counter: "",
  });

  const [showAddDishForm, setShowAddDishForm] = useState(false); 

  useEffect(() => {
    dispatch(fetchDishes());
     return () => {
          dispatch(fetchDishesSuccess([]));
        };
  }, [dispatch]);

  const handleAddToCart = (dish) => {
    const quantity = 1;
    dispatch(addTocart(dish._id, quantity));
  };

  const handleEditDish = (dish) => {
    setEditingDish(dish);
    setUpdatedDishData({
      name: dish.name,
      description: dish.description,
      price: dish.price,
      stock: dish.stock,
      counter: dish.counter || "",
      imageUrl: dish.imageUrl || "", 
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    dispatch(editDishes(editingDish._id, updatedDishData));
    setEditingDish(null);
    toast.success("Dish updated successfully", { autoClose: 2000 });
  };

  const handleAddNewDish = (e) => {
    e.preventDefault();
    dispatch(addNewDish(newDishData));
    setNewDishData({
      name: "",
      description: "",
      price: "",
      stock: true,
      counter: "",
      imageUrl: "",
    });
    setShowAddDishForm(false); 
    toast.success("New dish added successfully", { autoClose: 2000 });
  };

  const toggleAddDishForm = () => {
    setShowAddDishForm((prevState) => !prevState); 
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
        <div className="text-xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Available Dishes</h1>
        <button
          onClick={toggleAddDishForm}
          className="bg-[#505e4b] text-white py-2 px-4 rounded-md"
        >
          {showAddDishForm ? "Cancel" : "Add Dish"}
        </button>
      </div>
          {showAddDishForm && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Add New Dish</h2>
          <form onSubmit={handleAddNewDish}>
            <div>
              <label className="block text-gray-700">Dish Name</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded"
                value={newDishData.name}
                onChange={(e) =>
                  setNewDishData({
                    ...newDishData,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                className="w-full p-2 mt-1 border rounded"
                value={newDishData.description}
                onChange={(e) =>
                  setNewDishData({
                    ...newDishData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                className="w-full p-2 mt-1 border rounded"
                value={newDishData.price}
                onChange={(e) =>
                  setNewDishData({
                    ...newDishData,
                    price: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">Stock</label>
              <select
                className="w-full p-2 mt-1 border rounded"
                value={newDishData.stock}
                onChange={(e) =>
                  setNewDishData({
                    ...newDishData,
                    stock: e.target.value === "true",
                  })
                }
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
            <div>
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded"
              value={newDishData.imageUrl}
              onChange={(e) =>
                setNewDishData({
                  ...newDishData,
                  imageUrl: e.target.value,
                })
              }
            />
          </div>
            <div>
              <label className="block text-gray-700">Counter</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded"
                value={newDishData.counter}
                onChange={(e) =>
                  setNewDishData({
                    ...newDishData,
                    counter: e.target.value,
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full mt-4"
            >
              Add Dish
            </button>
            <button
              type="button"
              onClick={() => setShowAddDishForm(false)}
              className="bg-red-500 text-white p-2 rounded w-full mt-2"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    )}

      {editingDish && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Edit Dish</h2>
            <form onSubmit={handleSubmitEdit}>
              <div>
                <label className="block text-gray-700">Dish Name</label>
                <input
                  type="text"
                  className="w-full p-2 mt-1 border rounded"
                  value={updatedDishData.name}
                  onChange={(e) =>
                    setUpdatedDishData({
                      ...updatedDishData,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  className="w-full p-2 mt-1 border rounded"
                  value={updatedDishData.description}
                  onChange={(e) =>
                    setUpdatedDishData({
                      ...updatedDishData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  className="w-full p-2 mt-1 border rounded"
                  value={updatedDishData.price}
                  onChange={(e) =>
                    setUpdatedDishData({
                      ...updatedDishData,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700">Stock</label>
                <select
                  className="w-full p-2 mt-1 border rounded"
                  value={updatedDishData.stock}
                  onChange={(e) =>
                    setUpdatedDishData({
                      ...updatedDishData,
                      stock: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
              <div>
              <label className="block text-gray-700">Image URL</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded"
                value={updatedDishData.imageUrl}
                onChange={(e) =>
                  setUpdatedDishData({
                    ...updatedDishData,
                    imageUrl: e.target.value,
                  })
                }
              />
            </div>
              <div>
                <label className="block text-gray-700">Counter</label>
                <input
                  type="text"
                  className="w-full p-2 mt-1 border rounded"
                  value={updatedDishData.counter}
                  onChange={(e) =>
                    setUpdatedDishData({
                      ...updatedDishData,
                      counter: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded w-full"
              >
                Submit Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingDish(null)}
                className="bg-red-500 text-white p-2 rounded mt-2 w-full"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

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
                  src={dish.imageUrl || "/placeholder.jpg"} 
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
}

export default DishPage;
