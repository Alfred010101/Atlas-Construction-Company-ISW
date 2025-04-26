import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, error, setError, role } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Introduzca sus credenciales.");
    } else {
      const success = await login(username, password);
      if (success) {
        switch (role) {
          case "CEO":
            navigate("/ceo");
            break;
          case "SYS_ADMIN":
            navigate("/admin");
            break;
          case "RESOURCE_MANAGER":
            navigate("/resource");
            break;
          case "CONSTRUCTION_SUPERVISOR":
            navigate("/construction");
            break;
          case "WAREHOUSE_SUPERVISOR":
            navigate("/warehouse");
        }
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: "#121212",
        backgroundImage: "url('/public/img_login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          backgroundColor: "rgba(206, 206, 206, 0.8)",
          color: "#fff",
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src="/public/img_logo_temp.jpg"
            alt="Logo Atlas"
            style={{ height: 60 }}
          />
        </Box>
        <Typography
          variant="h6"
          textAlign="center"
          mb={3}
          sx={{ color: "#000" }}
        >
          Iniciar sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Correo"
            type="email"
            variant="filled"
            fullWidth
            margin="normal"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#000" }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: "#000" } }}
            sx={{
              input: { color: "#000" },
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: 1,
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="filled"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#000" }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: "#000" } }}
            sx={{
              input: { color: "#000" },
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: 1,
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#fbc02d",
              color: "#212121",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#f9a825",
              },
            }}
          >
            Ingresar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
