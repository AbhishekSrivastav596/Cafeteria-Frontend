import React from "react";
import DishItem from "./DishItem";

function DishList({ dishes, cartDishIds, handleAddToCart, handleEditDish,showCounterName, handleDeleteDish, showDeleteButton }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dishes.map((dish) => (
        <DishItem
          key={dish._id}
          dish={dish}
          onAddToCart={() => handleAddToCart(dish)}
          showCounterName={showCounterName} 
          onEditDish={handleEditDish ? () => handleEditDish(dish) : null}
          isInCart={cartDishIds.includes(dish._id)}
          onDeleteDish={handleDeleteDish}  
          showDeleteButton={showDeleteButton} 
        />
      ))}
    </ul>
  );
}

export default DishList;
