import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCounters } from "../slices/CounterSlice"; 
import { useNavigate } from "react-router-dom"; 
import flame from "../assets/flame.png"; 
import chai from "../assets/chai.png"; 

const counterImages = {
  "Flame on": flame,
  "Chaishh": chai,
};

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { counters, loading, error } = useSelector((state) => state.counter);

  useEffect(() => {
    dispatch(fetchCounters());
  }, [dispatch]);

  const handleImageClick = (counterId) => {
    navigate('/dishes');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 md:px-16">
      <h1 className="text-center text-3xl font-bold mb-10">Savor the flavors, feel the vibe!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {counters.length === 0 ? (
          <div className="text-center text-lg text-gray-500">No counters available.</div>
        ) : (
          counters.map((counter) => (
            <div
              key={counter._id} 
              className="relative bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <img
                src={counterImages[counter.name] || "/placeholder.jpg"} 
                alt={counter.name}
                className="w-full h-50 object-cover rounded-t-2xl cursor-pointer"
                onClick={() => handleImageClick(counter._id)}
              />

              <div className="p-4">
                <h2 className="text-center text-lg font-bold mb-2">{counter.name}</h2>
                <p className="text-sm text-gray-600">{counter.subtitle}</p>
              </div>

              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                NEW
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
