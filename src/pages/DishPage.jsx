import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchDishes,fetchDishesRequest,fetchDishesSuccess,selectCartDishId,} from "../slices/DishSlice";
import { addTocart } from "../slices/CartSlice";
import DishList from "../components/DishList";
import DishSkeleton from "../components/DishSkeleton";
import { toast } from "react-toastify";


function DishPage() {
  const dispatch = useDispatch();
  const { dishes, loading, error } = useSelector((state) => state.dish);
  const cartDishIds = useSelector(selectCartDishId);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchDishesRequest());
    const timeout = setTimeout(() => {
      dispatch(fetchDishes());
    }, 500);
     let toastInterval;
        if (!user) {
          toast.info("Please login to add dishes in cart");
          toastInterval = setInterval(() => {
            toast.info("Please login to add dishes in cart");
          }, 10000); 
        }
    return () => {
      if (toastInterval) clearInterval(toastInterval);
      clearTimeout(timeout);
      dispatch(fetchDishesSuccess([]));
    };
  }, [dispatch,user]);

  const handleAddToCart = (dish) => {
    dispatch(addTocart(dish._id, 1));
  };

  if (loading) {
    return <DishSkeleton />;
  }

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <DishList
          dishes={dishes}
          cartDishIds={cartDishIds}
          handleAddToCart={handleAddToCart}
          showCounterName={true}
          showDeleteButton={false}
        />
      </div>
    </div>
  );
}

export default DishPage;
