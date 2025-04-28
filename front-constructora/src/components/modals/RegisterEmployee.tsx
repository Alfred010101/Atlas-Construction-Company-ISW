import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";

const roles = [
  "SYS_ADMIN",
  "RESOURCE_MANAGER",
  "CONSTRUCTION_SUPERVISOR",
  "WAREHOUSE_SUPERVISOR",
  "CEO",
];

const RegisterEmployee = ({ open, handleClose, handleSubmit }: any) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    setUserData({
      ...userData,
      role: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token no disponible");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/v1/admin/registerUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al registrar el empleado.");
      }

      const result = await response.json();
      console.log("Empleado registrado:", result);

      handleSubmit("Empleado registrado exitosamente!", "success");
      handleClearFields();
      handleClose();
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error registrando empleado:", error);
    }
  };

  const handleClearFields = () => {
    setUserData({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      phone: "",
      role: "",
    });
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            width: 650,
          }}
        >
          <form onSubmit={handleFormSubmit} autoComplete="off">
            <Typography variant="h6" mb={2} textAlign="center">
              Registrar Nuevo Empleado
            </Typography>

            <TextField
              label="Nombre(s)"
              variant="outlined"
              fullWidth
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              margin="normal"
              autoComplete="off"
            />

            <TextField
              label="Apellido(s)"
              variant="outlined"
              fullWidth
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              margin="normal"
              autoComplete="off"
            />

            <TextField
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              name="username"
              value={userData.username}
              onChange={handleChange}
              margin="normal"
              autoComplete="off"
            />

            <TextField
              label="Contraseña"
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              margin="normal"
              autoComplete="off"
            />

            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              margin="normal"
              autoComplete="off"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Rol</InputLabel>
              <Select
                label="Rol"
                value={userData.role}
                onChange={handleRoleChange}
                name="role"
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Registrar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClearFields}
                sx={{ marginLeft: 2 }}
              >
                Limpiar Campos
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          ¡Empleado registrado correctamente!
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterEmployee;
