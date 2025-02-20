import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCounters } from "../slices/CounterSlice";  
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import DishSkeleton from "../components/DishSkeleton";

function HomePage() {
  const dispatch = useDispatch();
  const { counters, loading, error } = useSelector((state) => state.counter);

  useEffect(() => {
    dispatch(fetchCounters());
  }, [dispatch]);

  if (loading) {
    return <DishSkeleton />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
    <Carousel/>
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
              <Link to={`/dishes/${counter._id}`} className="w-full">
              <img
                src={counter.imageUrl || "/placeholder.jpg"} 
                alt={counter.name}
                className="w-full h-50 object-cover rounded-t-2xl cursor-pointer"
              />
              </Link>
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
    </>
  );
}

export default HomePage;
