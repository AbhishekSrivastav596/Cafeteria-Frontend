import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCounters, updateCounter, deleteCounterAsync, createCounter, fetchMerchants } from "../slices/CounterSlice";
import { Link } from "react-router-dom";

function CounterPage() {
  const dispatch = useDispatch();
  const { counters, loading, error,merchants } = useSelector((state) => state.counter);
  const [editCounter, setEditCounter] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    merchants: [],
  });
  const [newCounterForm, setNewCounterForm] = useState(false);
  const [newCounterData, setNewCounterData] = useState({
    name: "",
    imageUrl: "",
    merchants: [],
  });

  useEffect(() => {
    dispatch(fetchCounters());
    dispatch(fetchMerchants());
  }, [dispatch]);

  const handleEditClick = (counter) => {
    setEditCounter(counter);
    setFormData({
      name: counter.name,
      imageUrl: counter.imageUrl,
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
    <div className="max-w-6xl mx-auto p-4 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Counters</h1>
        <button
          onClick={() => setNewCounterForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none"
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
            <h3 className="text-lg font-semibold mt-2 mb-2">Assign Merchants</h3>
            <div className="max-h-40 overflow-y-auto">
              {merchants.map((merchant) => (
                <label key={merchant._id} className="flex items-center space-x-2 mb-1">
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
        <div className="text-center text-lg text-gray-500">No counters available.</div>
      ) : (
        <ul className="space-y-6">
          {counters.map((counter) => (
            <li
              key={counter._id}
              className="bg-white transition duration-300 hover:scale-101 focus:ring-[#faf0e6] p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center"
            >
              <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <Link to={`/dishes/${counter._id}`}>
                  <img
                    src={counter.imageUrl || "/placeholder.jpg"}
                    alt={counter.name}
                    className="w-30 h-30 object-cover rounded-lg mb-4 md:mb-0 mr-4"
                  />
                </Link>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{counter.name}</h3>
                  <p className="text-gray-600">Merchants: {counter.merchants.length}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <button
                  onClick={() => handleEditClick(counter)}
                  className="bg-[#9ba174] text-white px-4 py-2 rounded-md focus:outline-none"
                >
                  Edit Counter
                </button>
                <button
                  onClick={() => handleDeleteCounter(counter._id)}
                  className="bg-[#505e4b] text-white px-4 py-2 rounded-md focus:outline-none"
                >
                  Delete Counter
                </button>
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
            <h3 className="text-lg font-semibold mt-2 mb-2">Assign Merchants</h3>
            <div className="max-h-40 overflow-y-auto">
              {merchants.map((merchant) => (
                <label key={merchant._id} className="flex items-center space-x-2 mb-1">
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
