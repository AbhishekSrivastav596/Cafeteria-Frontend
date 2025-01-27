import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCounters,
  addMerchant,
  removeMerchant,
  deleteCounterAsync,
} from "../slices/CounterSlice";
import flame from "../assets/flame.png"; 
import chai from "../assets/chai.png"; 
import { useNavigate } from "react-router-dom";

const counterImages = {
  "Flame on": flame,
  "Chaishh": chai,
};

function CounterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { counters, loading, error } = useSelector((state) => state.counter);

  useEffect(() => {
    dispatch(fetchCounters());
  }, [dispatch]);

  const handleAddMerchant = (counterId, merchantId) => {
    dispatch(addMerchant(counterId, merchantId));
  };

  const handleRemoveMerchant = (counterId, merchantId) => {
    dispatch(removeMerchant(counterId, merchantId));
  };

  const handleDeleteCounter = (counterId) => {
    dispatch(deleteCounterAsync(counterId));
  };
  const handleImageClick = (counterId) => {
    navigate('/dishes');
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
        <div className="text-xl font-semibold text-red-500">
          Error: {error}
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 mb-10">
      <h1 className="text-3xl font-bold text-center mb-6">Counters</h1>
      {counters.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No counters available.
        </div>
      ) : (
        <ul className="space-y-6">
          {counters.map((counter) => (
            <li
              key={counter._id}
              className="bg-white hover:bg-[#fbf7f3] focus:ring-[#faf0e6] p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center"
            >
              <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <img
                  src={counterImages[counter.name] || "/placeholder.jpg"} 
                  alt={counter.name}
                  className="w-30 h-30 object-cover rounded-lg mb-4 md:mb-0 mr-4"
                  onClick={() => handleImageClick(counter._id)}
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {counter.name}
                  </h3>
                  <p className="text-gray-600">
                    Merchants: {counter.merchants.length}
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <button
                  onClick={() => handleAddMerchant(counter._id, "merchantId")}
                  className="bg-[#9ba174] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Add Merchant
                </button>
                <button
                  onClick={() =>
                    handleRemoveMerchant(counter._id, "merchantId")
                  }
                  className="bg-[#505e4b] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  Remove Merchant
                </button>
                <button
                  onClick={() => handleDeleteCounter(counter._id)}
                  className="bg-[#505e4b] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Delete Counter
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CounterPage;
