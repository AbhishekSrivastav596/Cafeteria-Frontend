import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    navigate('/dishes')
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 3 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.2, fontSize: "16px", backgroundColor: "#1976d2" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            New user?{" "}
            <Link to="/signup" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;
