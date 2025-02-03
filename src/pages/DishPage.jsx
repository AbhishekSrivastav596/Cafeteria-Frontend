import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchDishes,fetchDishesSuccess,editDishes,addNewDish,selectCartDishId} from "../slices/DishSlice";
import { addTocart } from "../slices/CartSlice";
import DishForm from "../components/DishForm";
import DishList from "../components/DishList";

function DishPage() {
  const dispatch = useDispatch();
  const { dishes, loading, error } = useSelector((state) => state.dish);
  const cartDishIds = useSelector(selectCartDishId);

  const [editingDish, setEditingDish] = useState(null);
  const [dishData, setDishData] = useState({
    name: "",
    description: "",
    price: "",
    stock: true,
    counter: "",
    imageUrl: "",
  });

  const [showAddDishForm, setShowAddDishForm] = useState(false);

  useEffect(() => {
    dispatch(fetchDishes());
    return () => {
      dispatch(fetchDishesSuccess([]));
    };
  }, [dispatch]);

  const handleAddToCart = (dish) => {
    dispatch(addTocart(dish._id, 1));
  };

  const handleEditDish = (dish) => {
    setEditingDish(dish);
    setDishData(dish);
  };

  const handleCancel = () => {
    setShowAddDishForm(false);
    setEditingDish(null);
    setDishData({
      name: "",
      description: "",
      price: "",
      stock: true,
      counter: "",
      imageUrl: "",
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    dispatch(editDishes(editingDish._id, dishData));
    setEditingDish(null);
    setDishData({
      name: "",
      description: "",
      price: "",
      stock: true,
      counter: "",
      imageUrl: "",
    });
  };

  const handleAddNewDish = (e) => {
    e.preventDefault();
    dispatch(addNewDish(dishData));
    setDishData({
      name: "",
      description: "",
      price: "",
      stock: true,
      counter: "",
      imageUrl: "",
    });
    setShowAddDishForm(false);
  };

  const toggleAddDishForm = () => {
    setShowAddDishForm((prev) => !prev);
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
            <DishForm
              dishData={dishData}
              onDishDataChange={setDishData}
              onSubmit={handleAddNewDish}
              formType="Add"
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      {editingDish && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Edit Dish</h2>
            <DishForm
              dishData={dishData}
              onDishDataChange={setDishData}
              onSubmit={handleSubmitEdit}
              formType="Edit"
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      <DishList
        dishes={dishes}
        cartDishIds={cartDishIds}
        handleAddToCart={handleAddToCart}
        handleEditDish={handleEditDish}
      />
    </div>
  );
}

export default DishPage;
