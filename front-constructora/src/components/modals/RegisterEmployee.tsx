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
import {
  validateName,
  validateUsername,
  validatePassword,
  validatePhoneMX,
  validateRole,
} from "./../../utils/validations";

import { roles } from "./../../utils/varConst";
import { saveEmployee } from "../../request/Employee";
import { Employee as EmployeeFull } from "../../interfaces/models/Models";

interface RegisterEmployeeModalProps {
  open: boolean;
  handleClose: () => void;
  refresh: () => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
}

const RegisterEmployee = ({
  open,
  handleClose,
  refresh,
  handleSnackBar,
}: RegisterEmployeeModalProps) => {
  const [employeeData, setEmployeeData] = useState<EmployeeFull>({
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

    setEmployeeData({
      ...employeeData,
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
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });

    setErrors({
      ...errors,
      role: validateRole(value),
    });
  };

  const validateForm = () => {
    const newErrors = {
      firstName: validateName(employeeData.firstName),
      lastName: validateName(employeeData.lastName),
      username: validateUsername(employeeData.username),
      password: validatePassword(employeeData.password),
      phone: validatePhoneMX(employeeData.phone),
      role: validateRole(employeeData.role),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    saveEmployee({ refresh, handleClearFields, handleSnackBar, employeeData });

    handleClose();
  };

  const handleClearFields = () => {
    setEmployeeData({
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
            value={employeeData.firstName}
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
            value={employeeData.lastName}
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
            value={employeeData.username}
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
            value={employeeData.password}
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
            value={employeeData.phone}
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
              value={employeeData.role}
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
  );
};

export default RegisterEmployee;
