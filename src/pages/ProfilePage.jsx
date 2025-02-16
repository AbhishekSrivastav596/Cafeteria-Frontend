import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import { userLogout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login");
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card
        sx={{ minWidth: 300, maxWidth: 400, borderRadius: 4, boxShadow: 4 }}
      >
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              src={user?.profilePic || "https://via.placeholder.com/100"}
              alt="Profile"
              sx={{
                width: 80,
                height: 80,
                border: "3px solid #ddd",
                boxShadow: 2,
              }}
            />
          </Box>

          {user?.name && (
            <Typography
              variant="h5"
              component="div"
              textAlign="center"
              fontWeight="bold"
            >
              {user.name}
            </Typography>
          )}
          {user?.email && (
            <Typography
              sx={{ color: "text.secondary", textAlign: "center", mt: 1 }}
            >
              {user.email}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "red",
              color: "white",
              "&:hover": { bgcolor: "darkred" },
              px: 3,
              py: 1,
              borderRadius: 2,
              boxShadow: 2,
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProfilePage;
