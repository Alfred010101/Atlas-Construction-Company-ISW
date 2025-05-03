import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { roles } from "./../../utils/varConst";
import { Employee } from "../../interfaces/ModelsTypes";
import { Employee as EmployeeFull } from "../../interfaces/models/Models";
import { getEmployee, updateEmployee } from "../../request/Employee";
import {
  validateName,
  validatePassword,
  validatePhoneMX,
  validateRole,
  validateUsername,
} from "../../utils/validations";

interface EditEmployeeModalProps {
  open: boolean;
  usernameToEdit: string | null;
  handleClose: () => void;
  handleSubmit: (
    text: string,
    type: "success" | "error",
    refresh: boolean,
    visble: boolean
  ) => void;
}

const EditEmployee = ({
  open,
  usernameToEdit,
  handleClose,
  handleSubmit,
}: EditEmployeeModalProps) => {
  const [employeeData, setEmployeeData] = useState<Employee>({
    employeeFirstName: "",
    employeeLastName: "",
    username: "",
    password: "",
    employeePhone: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    employeeFirstName: "",
    employeeLastName: "",
    username: "",
    password: "",
    employeePhone: "",
    role: "",
  });

  useEffect(() => {
    if (usernameToEdit) {
      getEmployee({ usernameToEdit, setEmployeeData });
    }
  }, [usernameToEdit]);

  // Validación en tiempo real
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEmployeeData({
      ...employeeData,
      [name]: value,
    });

    if (name === "employeeFirstName" || name === "employeeLastName") {
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
    } else if (name === "employeePhone") {
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
      employeeFirstName: validateName(employeeData.employeeFirstName || ""),
      employeeLastName: validateName(employeeData.employeeLastName || ""),
      username: "",
      password:
        (employeeData.password &&
          validatePassword(employeeData.password || "")) ||
        "",
      employeePhone: validatePhoneMX(employeeData.employeePhone || ""),
      role: validateRole(employeeData.role || ""),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      handleSubmit("Porfavor ingrese datos validos", "error", false, true);
      return;
    }

    const payload: Partial<EmployeeFull> = {
      firstName: employeeData.employeeFirstName,
      lastName: employeeData.employeeLastName,
      phone: employeeData.employeePhone,
      role: employeeData.role,
    };

    if (employeeData.password) {
      payload.password = employeeData.password;
    }

    updateEmployee({ handleSubmit, payload, usernameToEdit });

    handleClose();
  };

  const handleClearFields = () => {
    setEmployeeData({
      employeeFirstName: "",
      employeeLastName: "",
      username: "",
      password: "",
      employeePhone: "",
      role: "",
    });
    setErrors({
      employeeFirstName: "",
      employeeLastName: "",
      username: "",
      password: "",
      employeePhone: "",
      role: "",
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClearFields();
        handleClose();
      }}
    >
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
            Editar Usuario
          </Typography>

          <TextField
            label="Usuario"
            variant="standard"
            fullWidth
            name="username"
            value={employeeData.username}
            margin="normal"
            error={!!errors.username}
            helperText={errors.username}
            disabled
          />

          <TextField
            label="Nombre(s)"
            variant="standard"
            fullWidth
            name="employeeFirstName"
            value={employeeData.employeeFirstName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.employeeFirstName}
            helperText={errors.employeeFirstName}
          />

          <TextField
            label="Apellido(s)"
            variant="standard"
            fullWidth
            name="employeeLastName"
            value={employeeData.employeeLastName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.employeeLastName}
            helperText={errors.employeeLastName}
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
            error={
              !!errors.password && errors.password !== "Este campo es requerido"
            }
            helperText={
              (errors.password !== "Este campo es requerido" &&
                errors.password) ||
              "Deja vacío si no deseas cambiarla la contraseña"
            }
          />

          <TextField
            label="Teléfono"
            variant="standard"
            fullWidth
            name="employeePhone"
            value={employeeData.employeePhone}
            onChange={handleChange}
            margin="normal"
            error={!!errors.employeePhone}
            helperText={errors.employeePhone}
          />

          <FormControl fullWidth margin="normal" error={!!errors.role}>
            <InputLabel>Rol</InputLabel>
            <Select
              label="Rol"
              value={employeeData.role}
              variant="standard"
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
              onClick={() => {
                handleClearFields();
                handleClose();
              }}
              sx={{ marginRight: 2 }}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Guardar Cambios
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditEmployee;
