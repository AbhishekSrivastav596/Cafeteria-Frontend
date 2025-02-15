import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Avatar, Button, Box } from "@mui/material";

function ProfilePage() {
  const user = useSelector((state) => state.auth.user); 

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-6 shadow-lg rounded-2xl w-96 bg-white">
        <Box className="flex justify-center">
          <Avatar
            src={user?.profilePic || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 border-4 border-gray-300"
          />
        </Box>

        <CardContent className="text-center">
          <Typography variant="h5" className="font-semibold text-gray-800">
            {user?.name || "John Doe"}
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            {user?.email || "johndoe@example.com"}
          </Typography>

          <Button
            variant="contained"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
