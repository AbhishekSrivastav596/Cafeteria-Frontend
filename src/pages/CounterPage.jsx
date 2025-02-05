import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCounters,updateCounter,deleteCounterAsync,createCounter,fetchMerchants,fetchCountersRequest,fetchCountersSuccess,fetchMerchantsSuccess,} from "../slices/CounterSlice";
import { Link } from "react-router-dom";
import DishSkeleton from "../components/DishSkeleton";

function CounterPage() {
  const dispatch = useDispatch();
  const { counters, loading, error, merchants } = useSelector((state) => state.counter);
  const [editCounter, setEditCounter] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    merchants: [],
  });
  const [newCounterForm, setNewCounterForm] = useState(false);
  const [newCounterData, setNewCounterData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    merchants: [],
  });

  useEffect(() => {
    dispatch(fetchCountersRequest());

    const timeout = setTimeout(() => {
      dispatch(fetchCounters());
      dispatch(fetchMerchants());
    }, 500);

    return () => {
      clearTimeout(timeout);
      dispatch(fetchCountersSuccess([]));
      dispatch(fetchMerchantsSuccess([]));
    };
  }, [dispatch]);

  const handleEditClick = (counter) => {
    setEditCounter(counter);
    setFormData({
      name: counter.name,
      imageUrl: counter.imageUrl,
      description: counter.description || "",
      merchants: counter.merchants.map((merchant) => merchant._id) || [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewCounterInputChange = (e) => {
    const { name, value } = e.target;
    setNewCounterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMerchantToggle = (merchantId) => {
    setFormData((prev) => {
      const updatedMerchants = prev.merchants.includes(merchantId)
        ? prev.merchants.filter((id) => id !== merchantId)
        : [...prev.merchants, merchantId];
      return { ...prev, merchants: updatedMerchants };
    });
  };

  const handleNewMerchantToggle = (merchantId) => {
    setNewCounterData((prev) => {
      const updatedMerchants = prev.merchants.includes(merchantId)
        ? prev.merchants.filter((id) => id !== merchantId)
        : [...prev.merchants, merchantId];
      return { ...prev, merchants: updatedMerchants };
    });
  };

  const handleUpdateCounter = () => {
    if (editCounter) {
      dispatch(updateCounter(editCounter._id, formData));
      setEditCounter(null);
    }
  };

  const handleAddNewCounter = () => {
    dispatch(createCounter(newCounterData));
    setNewCounterForm(false);
  };

  const handleDeleteCounter = (counterId) => {
    dispatch(deleteCounterAsync(counterId));
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
    <div className="max-w-6xl mx-auto p-4 mb-10">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setNewCounterForm(true)}
          className="bg-[#505e4b] text-white px-4 py-2 rounded-md focus:outline-none"
        >
          Add Counter
        </button>
      </div>

      {newCounterForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Add New Counter</h2>
            <input
              type="text"
              name="name"
              value={newCounterData.name}
              onChange={handleNewCounterInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Counter Name"
            />
            <input
              type="text"
              name="imageUrl"
              value={newCounterData.imageUrl}
              onChange={handleNewCounterInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Image URL"
            />
            <textarea
              name="description"
              value={newCounterData.description}
              onChange={handleNewCounterInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Description"
            />
            <h3 className="text-lg font-semibold mt-2 mb-2">
              Assign Merchants
            </h3>
            <div className="max-h-40 overflow-y-auto">
              {merchants.map((merchant) => (
                <label
                  key={merchant._id}
                  className="flex items-center space-x-2 mb-1"
                >
                  <input
                    type="checkbox"
                    checked={newCounterData.merchants.includes(merchant._id)}
                    onChange={() => handleNewMerchantToggle(merchant._id)}
                  />
                  <span>{merchant.name}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setNewCounterForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewCounter}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Add Counter
              </button>
            </div>
          </div>
        </div>
      )}

      {counters.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No counters available.
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {counters.map((counter) => (
            <li
              key={counter._id}
              className="bg-white transition duration-300 hover:shadow-2xl rounded-2xl shadow-md border border-gray-800 flex flex-col overflow-hidden"
            >
              <Link to={`/dishes/${counter._id}`} className="w-full">
                <img
                  src={counter.imageUrl || "/placeholder.jpg"}
                  alt={counter.name}
                  className="w-full h-48 object-cover rounded-t-2xl border-b border-gray-800"
                />
              </Link>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {counter.name}
                </h3>
                <p className="text-gray-700 text-sm mt-1">
                  Merchants: <span className="font-medium">{counter.merchants.length}</span>
                </p>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed italic font-bold">
                  {counter.description}
                </p>
                <div className="mt-5 flex justify-center space-x-4">
                  <button
                    onClick={() => handleEditClick(counter)}
                    className="bg-gray-900 text-white px-5 py-2 rounded-lg transition duration-300 hover:bg-gray-700"
                  >
                    Edit Counter
                  </button>
                  <button
                    onClick={() => handleDeleteCounter(counter._id)}
                    className="bg-red-700 text-white px-5 py-2 rounded-lg transition duration-300 hover:bg-red-600"
                  >
                    Delete Counter
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editCounter && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Edit Counter</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Counter Name"
            />
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Image URL"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Description"
            />
            <h3 className="text-lg font-semibold mt-2 mb-2">
              Assign Merchants
            </h3>
            <div className="max-h-40 overflow-y-auto">
              {merchants.map((merchant) => (
                <label
                  key={merchant._id}
                  className="flex items-center space-x-2 mb-1"
                >
                  <input
                    type="checkbox"
                    checked={formData.merchants.includes(merchant._id)}
                    onChange={() => handleMerchantToggle(merchant._id)}
                  />
                  <span>{merchant.name}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setEditCounter(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCounter}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CounterPage;
