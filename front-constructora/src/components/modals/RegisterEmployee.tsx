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

// Definir los roles disponibles
const roles = [
  "SYS_ADMIN",
  "RESOURCE_MANAGER",
  "CONSTRUCTION_SUPERVISOR",
  "WAREHOUSE_SUPERVISOR",
  "CEO",
];

const RegisterEmployee = ({ open, handleClose, handleSubmit }: any) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

  // Ajustar el tipo de evento para Select
  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    setUserData({
      ...userData,
      role: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir la acción por defecto del formulario
    handleSubmit(userData);
    handleClose(); // Cerrar el modal después de enviar los datos
  };

  // Función para limpiar los campos
  const handleClearFields = () => {
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      role: "",
    });
  };

  return (
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
            name="email"
            value={userData.email}
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
              onChange={handleRoleChange} // Cambiar el tipo de evento aquí
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
              onClick={handleClearFields} // Llamar a la función para limpiar los campos
              sx={{ marginLeft: 2 }}
            >
              Limpiar Campos
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default RegisterEmployee;
