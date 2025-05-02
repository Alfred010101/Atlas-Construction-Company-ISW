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
import {
  validateName,
  validateUsername,
  validatePassword,
  validatePhoneMX,
  validateRole,
} from "./../../utils/validations";

import { roles } from "./../../utils/varConst";

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

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    role: "",
  });

  // Validación en tiempo real
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });

    if (name === "firstName" || name === "lastName") {
      setErrors({
        ...errors,
        [name]: validateName(value),
      });
    } else if (name === "username") {
      setErrors({
        ...errors,
        [name]: validateUsername(value),
      });
    } else if (name === "password") {
      setErrors({
        ...errors,
        [name]: validatePassword(value),
      });
    } else if (name === "phone") {
      setErrors({
        ...errors,
        [name]: validatePhoneMX(value),
      });
    }
  };

  // Validación en tiempo real
  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setUserData({
      ...userData,
      role: value,
    });

    setErrors({
      ...errors,
      role: validateRole(value),
    });
  };

  const validateForm = () => {
    const newErrors = {
      firstName: validateName(userData.firstName),
      lastName: validateName(userData.lastName),
      username: validateUsername(userData.username),
      password: validatePassword(userData.password),
      phone: validatePhoneMX(userData.phone),
      role: validateRole(userData.role),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
      handleSubmit(
        "Error registrando empleado: ".concat(String(error)),
        "error"
      );
      handleClose();
      setOpenSnackbar(true);
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
    setErrors({
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
            borderRadius: 5,
            width: 650,
          }}
        >
          <form onSubmit={handleFormSubmit} autoComplete="off">
            <Typography variant="h6" mb={2} textAlign="center">
              Registrar Nuevo Empleado
            </Typography>

            <TextField
              label="Nombre(s)"
              variant="standard"
              fullWidth
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName}
            />

            <TextField
              label="Apellido(s)"
              variant="standard"
              fullWidth
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName}
            />

            <TextField
              label="Usuario"
              variant="standard"
              fullWidth
              name="username"
              value={userData.username}
              onChange={handleChange}
              margin="normal"
              error={!!errors.username}
              helperText={errors.username}
            />

            <TextField
              label="Contraseña"
              variant="standard"
              fullWidth
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
            />

            <TextField
              label="Teléfono (México)"
              variant="standard"
              fullWidth
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone}
              placeholder="Ej. 55 1234 5678 o +52 55 1234 5678"
            />

            <FormControl fullWidth margin="normal" error={!!errors.role}>
              <InputLabel>Rol</InputLabel>
              <Select
                label="Rol"
                variant="standard"
                value={userData.role}
                onChange={handleRoleChange}
                name="role"
              >
                {roles.map((role) => (
                  <MenuItem
                    key={role.value}
                    value={role.value}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#CCC",
                      },
                    }}
                  >
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.role && (
                <Typography variant="caption" color="error">
                  {errors.role}
                </Typography>
              )}
            </FormControl>

            <Box display="flex" justifyContent="right" mt={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClearFields}
                sx={{ marginRight: 2 }}
              >
                Limpiar Campos
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Registrar
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
