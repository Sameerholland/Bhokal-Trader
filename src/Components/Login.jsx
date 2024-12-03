import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoginAsync, LoginedInfo } from "../Features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ Id: "", password: "" });
  const [loading, setLoading] = useState(false);  // For loading state
  const [error, setError] = useState("");         // For error state
  const dispatch = useDispatch();
  const islogined = useSelector(LoginedInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (islogined && islogined.role === 'user') {
      navigate('/');
    }
  }, [islogined, navigate]);

  const validateForm = () => {
    if (!credentials.Id || !credentials.password) {
      setError("Both fields are required");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setError("");  // Reset error on each login attempt
    if (!validateForm()) return;

    setLoading(true);  // Start loading
    try {
      await dispatch(LoginAsync({ Id: credentials.Id, password: credentials.password }));
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);  // Stop loading after attempt
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
        color: "#fff",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Bhokal Trader Dashboard
      </Typography>
      <TextField
        label="Id"
        variant="outlined"
        sx={{ mb: 2, width: "300px", backgroundColor: "#fff", borderRadius: "5px" }}
        value={credentials.Id}
        onChange={(e) => setCredentials({ ...credentials, Id: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        sx={{ mb: 2, width: "300px", backgroundColor: "#fff", borderRadius: "5px" }}
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      {error && <Typography sx={{ color: 'red', mb: 2 }}>{error}</Typography>} {/* Display error message */}

      <Button
        variant="contained"
        sx={{
          background: "linear-gradient(to right, #ff7e5f, #feb47b)",
          "&:hover": {
            background: "linear-gradient(to right, #feb47b, #ff7e5f)",
          },
        }}
        onClick={handleLogin}
        disabled={loading}  // Disable button while loading
      >
        {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Login"} {/* Show loading spinner while processing */}
      </Button>
    </Box>
  );
};

export default LoginPage;
