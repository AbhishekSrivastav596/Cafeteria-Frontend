import React from "react";
import { Skeleton } from "@mui/material";

function DishSkeleton(){
  return (
    <div className="flex justify-center items-center min-h-screen bg-white flex-grow">
      <div className="max-w-6xl w-full p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-4 rounded-lg shadow-md bg-white">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={150}
                sx={{ bgcolor: "#b0b0b0" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width="80%"
                sx={{ marginTop: 1, bgcolor: "#a0a0a0" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width="60%"
                sx={{ bgcolor: "#a0a0a0" }}
                animation="wave"
              />
              <Skeleton
                variant="rounded"
                width="50%"
                height={30}
                sx={{ marginTop: 1, bgcolor: "#909090" }}
                animation="wave"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishSkeleton;
