import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {fetchDishByCounter,editDishes,addNewDish,selectCartDishId,fetchDishesSuccess,deleteDish,fetchDishesRequest,} from "../slices/DishSlice";
import { addTocart } from "../slices/CartSlice";
import DishForm from "../components/DishForm";
import DishList from "../components/DishList";
import DishSkeleton from "../components/DishSkeleton";

const DishByCounterPage = () => {
  const { counterId } = useParams();
  const dispatch = useDispatch();
  const { dishes, loading, error } = useSelector((state) => state.dish);
  const user = useSelector((state) => state.auth.user);
  const cartDishIds = useSelector(selectCartDishId);

  const [editingDish, setEditingDish] = useState(null);
  const [showAddDishForm, setShowAddDishForm] = useState(false);
  const [dishData, setDishData] = useState({
    name: "",
    description: "",
    price: "",
    stock: true,
    counter: counterId,
    imageUrl: "",
  });

  useEffect(() => {
    dispatch(fetchDishesRequest());
    const timeout = setTimeout(() => {
      dispatch(fetchDishByCounter(counterId));
    }, 500);
    return () => {
      clearTimeout(timeout);
      dispatch(fetchDishesSuccess([]));
    };
  }, [counterId, dispatch]);

  const handleAddToCart = (dish) => {
    dispatch(addTocart(dish._id, 1));
  };

  const handleEditDish = (dish) => {
    setEditingDish(dish);
    setDishData({
      name: dish.name,
      description: dish.description,
      price: dish.price,
      stock: dish.stock,
      counter: counterId,
      imageUrl: dish.imageUrl,
    });
  };

  const handleCancel = () => {
    setShowAddDishForm(false);
    setEditingDish(null);
    setDishData({
      name: "",
      description: "",
      price: "",
      stock: true,
      counter: counterId,
      imageUrl: "",
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    dispatch(editDishes(editingDish._id, dishData));
    setEditingDish(null);
    handleCancel();
  };

  const handleAddNewDish = (e) => {
    e.preventDefault();
    dispatch(addNewDish(dishData));
    handleCancel();
  };

  const handleDeleteDish = (dishId) => {
    dispatch(deleteDish(dishId));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
      {(user?.role==='merchant') && ( 
        <button
          onClick={() => setShowAddDishForm(true)}
          className="bg-[#505e4b] text-white py-2 px-4 rounded-md"
        >
          Add Dish
        </button>
      )}
      </div>

      {showAddDishForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-[9999]">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-1 text-center">
              Add New Dish
            </h2>
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-[9999]">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-1 text-center">
              Edit Dish
            </h2>
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

      {loading ? (
        <DishSkeleton />
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl font-semibold text-red-500">
            Error: {error}
          </div>
        </div>
      ) : dishes.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No dishes available.
        </div>
      ) : (
        <DishList
          dishes={dishes}
          cartDishIds={cartDishIds}
          handleAddToCart={handleAddToCart}
          handleEditDish={handleEditDish}
          showCounterName={false}
          handleDeleteDish={handleDeleteDish}
          showDeleteButton={true}
        />
      )}
    </div>
  );
};

export default DishByCounterPage;
