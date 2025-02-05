import React from "react";
import Skeleton from "@mui/material/Skeleton";

function CartSkeleton(){
  return (
    <div className="flex justify-center items-center min-h-screen bg-white flex-grow">
      <div className="max-w-6xl w-full p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          <Skeleton variant="text" width={200} height={40} animation="wave" sx={{ bgcolor: "#b0b0b0" }} />
        </h1>
        <div className="mb-4 flex justify-between items-center">
          <Skeleton variant="text" width={150} height={30} animation="wave" sx={{ bgcolor: "#a0a0a0" }} />
          <Skeleton variant="text" width={120} height={30} animation="wave" sx={{ bgcolor: "#a0a0a0" }} />
        </div>
        <ul className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <li
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border flex flex-col md:flex-row justify-between items-center"
            >
              <Skeleton
                variant="rectangular"
                width={100}
                height={100}
                animation="wave"
                sx={{ bgcolor: "#b0b0b0" }}
              />
              <div className="ml-4 flex-grow">
                <Skeleton variant="text" width="80%" height={20} animation="wave" sx={{ bgcolor: "#a0a0a0" }} />
                <Skeleton variant="text" width="60%" height={20} animation="wave" sx={{ bgcolor: "#a0a0a0" }} />
                <Skeleton variant="text" width="50%" height={20} animation="wave" sx={{ bgcolor: "#909090" }} />
              </div>
              <Skeleton
                variant="rectangular"
                width={80}
                height={30}
                animation="wave"
                sx={{ bgcolor: "#909090" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartSkeleton;
