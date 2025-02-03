import React from "react";

function DishForm({dishData,onDishDataChange,onSubmit,formType = "Add", onCancel}){
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label className="block text-gray-700">Dish Name</label>
        <input
          type="text"
          className="w-full p-2 mt-1 border rounded"
          value={dishData.name}
          onChange={(e) => onDishDataChange({ ...dishData, name: e.target.value })}/>
      </div>
      <div>
        <label className="block text-gray-700">Description</label>
        <textarea
          className="w-full p-2 mt-1 border rounded"
          value={dishData.description}
          onChange={(e) => onDishDataChange({ ...dishData, description: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          className="w-full p-2 mt-1 border rounded"
          value={dishData.price}
          onChange={(e) => onDishDataChange({ ...dishData, price: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-gray-700">Stock</label>
        <select
          className="w-full p-2 mt-1 border rounded"
          value={dishData.stock}
          onChange={(e) => onDishDataChange({
              ...dishData,
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
          value={dishData.imageUrl}
          onChange={(e) =>onDishDataChange({ ...dishData, imageUrl: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-gray-700">Counter</label>
        <input
          type="text"
          className="w-full p-2 mt-1 border rounded bg-gray-200 cursor-not-allowed"
          value={dishData.counter}
          readOnly 
        />
      </div>
      <button
        type="submit"
        className={'bg-green-500 text-white p-2 rounded w-full mt-4'}
      >
        {formType} Dish
      </button>
      <button
        type="button"
        onClick={onCancel} 
        className="bg-red-500 text-white p-2 rounded w-full mt-2"
      >
        Cancel
      </button>
    </form>
  );
};

export default DishForm;
